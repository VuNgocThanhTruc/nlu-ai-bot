from fastapi import WebSocket
from typing import List
import torch
from transformers import (
    StoppingCriteria, StoppingCriteriaList, TextIteratorStreamer
)
from threading import Thread

class WebsocketConnection:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, data):
        for connection in self.active_connections:
            await connection.send_json(data)
            
    async def generate_and_broadcast(self, model, tokenizer, message):
        stop = StopOnTokens()
        # history_transformer_format = history + [[message, ""]]
        messages = (f"""
                    <|im_start|> system
                    Bạn là một trợ lý AI chuyên về quy chế học vụ. Hãy trả lời các câu hỏi của người dùng một cách chính xác và chi tiết, dựa trên các quy định và chính sách của trường.
                    <|im_end|>
                    <|im_start|> user
                    {message}
                    <|im_end|>
                    <|im_start|> assistant
                    """)
                    
        model_inputs = tokenizer([messages], return_tensors="pt").to("cpu")
        streamer = TextIteratorStreamer(tokenizer, timeout=30., skip_prompt=True, skip_special_tokens=False)

        generate_kwargs = dict(
            model_inputs,
            streamer=streamer,
            max_new_tokens=512,
            do_sample=True,
            top_p=0.9,
            top_k=50,
            temperature=0.7,
            num_return_sequences = 1,
            # num_beams=1,
            stopping_criteria=StoppingCriteriaList([stop]),
            eos_token_id=tokenizer.eos_token_id,
            pad_token_id=tokenizer.eos_token_id,
            )
        t = Thread(target=model.generate, kwargs=generate_kwargs)
        t.start()

        partial_message  = ""
        for new_token in streamer:
            print(new_token)
            response = {
                    'user': { 'id': 1, 'role': 0, 'username': "bot" },
                    'generate_text': new_token,
                    'prev_text': input,
                    'stop': False
                }

                # Gửi response dưới dạng JSON
            await self.broadcast(response)
                
            if new_token != '<':
                partial_message += new_token
                # yield partial_message
                
        response = {
                    'user': { 'id': 1, 'role': 0, 'username': "bot" },
                    'generate_text': new_token,
                    'prev_text': input,
                    'stop': True
                }

                # Gửi response dưới dạng JSON
        await self.broadcast(response)
        t.join()
        return partial_message

class StopOnTokens(StoppingCriteria):
    def __call__(self, input_ids: torch.LongTensor, scores: torch.FloatTensor, **kwargs) -> bool:
        # stop_ids = [29901, 0, 1, 2, 46303, 46304, 40305,30375,30383,1115,16201620, 29242]
        stop_ids = [0, 1, 2, 46303, 46304, 40305,29889]
        # stop_ids = [0, 1, 2, 46303, 46304, 40305]
        for stop_id in stop_ids:
            if input_ids[0][-1] == stop_id:
                return True
        return False