from pydantic import BaseModel
from typing import List
from datetime import datetime

class RoomBase(BaseModel):
    id_user: int

class RoomCreate(RoomBase):
    pass

class RoomUpdate(RoomBase):
    pass

class Room(RoomBase):
    id: int
    create_at: datetime
    update_at: datetime

    class Config:
        from_attributes = True