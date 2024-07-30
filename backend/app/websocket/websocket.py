from fastapi import WebSocket
from typing import List
import torch

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
            
    async def generate_and_broadcast(self, model, tokenizer, data, max_new_tokens=8, context_size=20, temperature=0.1, top_k=50, top_p=0.95, eos_token_id=2):
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        input = data['text']
        idx = tokenizer.encode(input, return_tensors="pt").to(device)
        stop = False
        idx = idx.to(device)
        for _ in range(max_new_tokens):
            idx_cond = idx[:, -context_size:]

            with torch.no_grad():
                outputs = model(input_ids=idx_cond)
                logits = outputs.logits

            logits = logits[:, -1, :]

            if top_k is not None:
                top_logits, _ = torch.topk(logits, top_k)
                min_val = top_logits[:, -1]
                logits = torch.where(logits < min_val, torch.tensor(float('-inf')).to(logits.device), logits)

            if top_p is not None and top_p < 1.0:
                sorted_logits, sorted_indices = torch.sort(logits, descending=True)
                cumulative_probs = torch.cumsum(torch.softmax(sorted_logits, dim=-1), dim=-1)

                sorted_indices_to_remove = cumulative_probs > top_p
                sorted_indices_to_remove[:, 1:] = sorted_indices_to_remove[:, :-1].clone()
                sorted_indices_to_remove[:, 0] = 0

                indices_to_remove = sorted_indices_to_remove.scatter(1, sorted_indices, sorted_indices_to_remove)
                logits[indices_to_remove] = float('-inf')

            if temperature > 0.0:
                logits = logits / temperature
                probs = torch.softmax(logits, dim=-1)
                idx_next = torch.multinomial(probs, num_samples=1)
            else:
                idx_next = torch.argmax(logits, dim=-1, keepdim=True)

            if eos_token_id is not None and (idx_next == eos_token_id).any():
                stop = True

            if idx.shape[1] >= (max_new_tokens):
                stop = True

            response = {
                'user': { 'id': 1, 'role': 0, 'username': "bot" },
                'generate_text': tokenizer.decode(idx_next[0], skip_special_tokens=True),
                'prev_text': input,
                'stop': stop
            }

            # Gửi response dưới dạng JSON
            await self.broadcast(response)

            if stop:
                break

            idx = torch.cat((idx, idx_next), dim=1)
            input = tokenizer.decode(idx[0], skip_special_tokens=True)
