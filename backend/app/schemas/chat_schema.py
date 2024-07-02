from pydantic import BaseModel
from typing import List
from datetime import datetime
from typing import Optional
# from app.schemas.user_schema import User

class ChatBase(BaseModel):
    message: str
    id_room: int
    id_user: int

class ChatCreate(ChatBase):
    pass

class ChatUpdate(ChatBase):
    pass

class UserBase(BaseModel):
    username: str
    role: int
    id: int
    
class Chat(ChatBase):
    id: int
    create_at: datetime
    user: Optional[UserBase]
    
    class Config:
        from_attributes = True