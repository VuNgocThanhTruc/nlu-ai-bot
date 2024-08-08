from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.database.database_connection import create_tables
from app.routers import users_router, chats_router, rooms_router, dataset_router
from fastapi.middleware.cors import CORSMiddleware
from app.websocket import websocket
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    StoppingCriteria, StoppingCriteriaList, TextIteratorStreamer
)
from threading import Thread

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
    # "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

model = None
base_model = 'nluai/chatbot_dhnl_v3'
tokenizer = AutoTokenizer.from_pretrained(base_model)
tokenizer.pad_token=tokenizer.eos_token
tokenizer.padding_side="right"

@app.on_event("startup")
def load_model():
    global model
    # Model
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        #Quant type
        #We will use the "nf4" format this was introduced in the QLoRA paper
        bnb_4bit_quant_type="nf4",
        #As the model weights are stored using 4 bits and when we want to compute its only going to use 16 bits so we have more accuracy
        bnb_4bit_compute_dtype=torch.float16,
        #Quantization parameters are quantized
        bnb_4bit_use_double_quant=True,
    )

    # Load base moodel
    model = AutoModelForCausalLM.from_pretrained(
        base_model,
        # device_map=0,
        trust_remote_code=True,
        low_cpu_mem_usage=True,
        torch_dtype=torch.bfloat16,
        use_cache=False,
    )
    
class StopOnTokens(StoppingCriteria):
    def __call__(self, input_ids: torch.LongTensor, scores: torch.FloatTensor, **kwargs) -> bool:
        # stop_ids = [29901, 0, 1, 2, 46303, 46304, 40305,30375,30383,1115,16201620, 29242]
        stop_ids = [0, 1, 2, 46303, 46304, 40305,29889]
        # stop_ids = [0, 1, 2, 46303, 46304, 40305]
        for stop_id in stop_ids:
            if input_ids[0][-1] == stop_id:
                return True
        return False
    
def predict(message):

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
                
    model_inputs = tokenizer([messages], return_tensors="pt").to("cuda")
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
        if new_token != '<':
            partial_message += new_token
            # yield partial_message
    t.join()
    return partial_message
    
@app.post("/api/generate")
async def get_generation(message):
    try:
        
        response = predict(message)
        print(response)
        return {"status": 200, "data": response}
    except Exception as e:
        return {"status": 500, "data": f"error: {e}"}

@app.get("/")
def read_root():
    return {"Hello": "World"}

# websocket
wsConnection = websocket.WebsocketConnection()
@app.websocket("/")
async def websocket_endpoints(ws: WebSocket):
    await wsConnection.connect(ws)
    try:
        while True:
            data = await ws.receive_json()
            if(data['user']['role']!=0):
                await wsConnection.broadcast(data)
                
            await wsConnection.generate_and_broadcast(model, tokenizer, data)
    except WebSocketDisconnect:
        wsConnection.disconnect(ws)

app.include_router(users_router.router, prefix="/users", tags=["users"])
app.include_router(rooms_router.router, prefix="/rooms", tags=["rooms"])
app.include_router(chats_router.router, prefix="/chats", tags=["chats"])
app.include_router(dataset_router.router, prefix="/datasets", tags=["datasets"])