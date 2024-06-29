from fastapi import FastAPI

from app.database.database_connection import create_tables
from app.routers import users_router, chats_router, rooms_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Cấu hình CORS
origins = [
    "http://localhost:3000",  # React app chạy trên localhost:3000
    "http://example.com",     # Thêm các domain khác nếu cần
    # "*"  # Cho phép tất cả các domain (Không khuyến khích)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Danh sách các domain được phép
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP
    allow_headers=["*"],  # Cho phép tất cả các header
)

create_tables()

@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(users_router.router, prefix="/users", tags=["users"])
app.include_router(rooms_router.router, prefix="/rooms", tags=["rooms"])
app.include_router(chats_router.router, prefix="/chats", tags=["chats"])