from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import room_crud
from app.schemas import room_schema
from typing import List
from app.database.database_connection import get_db

router = APIRouter()

@router.post("/", response_model=room_schema.Room)
def create_room(room: room_schema.RoomCreate, db: Session = Depends(get_db)):
    return room_crud.create_room(db=db, room=room)

@router.get("/", response_model=list[room_schema.Room])
def read_rooms(db: Session = Depends(get_db)):
    return room_crud.get_rooms(db=db)

@router.get("/{room_id}", response_model=room_schema.Room)
def read_room(room_id: int, db: Session = Depends(get_db)):
    db_room = room_crud.get_room(db=db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@router.get("/user/{user_id}", response_model=list[room_schema.Room])
def read_rooms_by_user(user_id: int, db: Session = Depends(get_db)):
    rooms = room_crud.get_rooms_by_user_id(db=db, user_id=user_id)
    if not rooms:
        raise HTTPException(status_code=404, detail="No rooms found for the given user")
    return rooms

@router.put("/{room_id}", response_model=room_schema.Room)
def update_room(room_id: int, room: room_schema.RoomUpdate, db: Session = Depends(get_db)):
    db_room = room_crud.update_room(db=db, room_id=room_id, room=room)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@router.delete("/{room_id}", response_model=room_schema.Room)
def delete_room(room_id: int, db: Session = Depends(get_db)):
    db_room = room_crud.delete_room(db=db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room