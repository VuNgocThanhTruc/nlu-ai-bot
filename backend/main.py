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
)

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
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_use_double_quant=True,
    )

    # Load base moodel
    model = AutoModelForCausalLM.from_pretrained(
        base_model,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
    )

    model.config.use_cache = False

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
            await wsConnection.predict(model, tokenizer, data)
    except WebSocketDisconnect:
        wsConnection.disconnect(ws)

app.include_router(users_router.router, prefix="/users", tags=["users"])
app.include_router(rooms_router.router, prefix="/rooms", tags=["rooms"])
app.include_router(chats_router.router, prefix="/chats", tags=["chats"])