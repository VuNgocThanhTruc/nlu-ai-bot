from pydantic import BaseModel
from typing import List
from datetime import datetime

class ChatBase(BaseModel):
    message: str
    id_room: int
    id_user: int

class ChatCreate(ChatBase):
    pass

class ChatUpdate(ChatBase):
    pass

class Chat(ChatBase):
    id: int
    create_at: datetime
    update_at: datetime

    class Config:
        from_attributes = True