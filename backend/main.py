from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.database.database_connection import create_tables
from app.routers import users_router, chats_router, rooms_router, dataset_router
from fastapi.middleware.cors import CORSMiddleware
from app.websocket import websocket
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer
)

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",
    "http://example.com",
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
base_model = 'bigscience/bloomz-560m'
tokenizer = AutoTokenizer.from_pretrained(base_model)
tokenizer.pad_token=tokenizer.eos_token
tokenizer.padding_side="right"

@app.on_event("startup")
def load_model():
    global model
    # Model
    model = AutoModelForCausalLM.from_pretrained(
              base_model,
            #   device_map=0,
              trust_remote_code=True,
              low_cpu_mem_usage=True,
              torch_dtype=torch.bfloat16,
              use_cache=False,
            )

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


