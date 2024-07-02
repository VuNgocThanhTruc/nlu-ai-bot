from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models import room_model
from app.schemas import room_schema

def create_room(db: Session, room: room_schema.RoomCreate):
    db_room = room_model.Room(id_user=room.id_user, title=room.title)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def get_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(room_model.Room).offset(skip).limit(limit).all()

def get_room(db: Session, room_id: int):
    return db.query(room_model.Room).filter(room_model.Room.id == room_id).first()

def get_rooms_by_user_id(db: Session, user_id: int):
    return db.query(room_model.Room).filter(room_model.Room.id_user == user_id).order_by(desc(room_model.Room.update_at)).all()

def update_room(db: Session, room_id: int, room: room_schema.RoomUpdate):
    db_room = db.query(room_model.Room).filter(room_model.Room.id == room_id).first()
    if db_room:
        db_room.id_user = room.id_user
        db.commit()
        db.refresh(db_room)
    return db_room

def delete_room(db: Session, room_id: int):
    db_room = db.query(room_model.Room).filter(room_model.Room.id == room_id).first()
    if db_room:
        db.delete(db_room)
        db.commit()
    return db_room