from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.database.database_connection import create_tables
from app.routers import users_router, chats_router, rooms_router
from fastapi.middleware.cors import CORSMiddleware
from app.websocket import websocket

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
            data = await ws.receive_text()
            await wsConnection.broadcast(data)
    except WebSocketDisconnect:
        wsConnection.disconnect(ws)

app.include_router(users_router.router, prefix="/users", tags=["users"])
app.include_router(rooms_router.router, prefix="/rooms", tags=["rooms"])
app.include_router(chats_router.router, prefix="/chats", tags=["chats"])