from pydantic import BaseModel
from typing import List
from app.schemas.chat_schema import Chat

class UserBase(BaseModel):
    username: str
    password: str
    role: int

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True
