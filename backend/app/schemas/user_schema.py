from pydantic import BaseModel
from typing import List
from app.schemas.chat_schema import Chat

class UserBase(BaseModel):
    username: str
    role: int

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True
