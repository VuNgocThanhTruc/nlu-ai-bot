from sqlalchemy.orm import Session
from app.models import chat_model, room_model
from app.schemas import chat_schema
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import func

def create_chat(db: Session, chat: chat_schema.ChatCreate):
    db_chat = chat_model.Chat(message=chat.message, id_room=chat.id_room, id_user=chat.id_user)
    db.add(db_chat)

    room = db.query(room_model.Room).filter(room_model.Room.id == chat.id_room).first()
    if room:
        room.update_at = func.now()

    db.commit()
    db.refresh(db_chat)
    return db_chat

def get_chats(db: Session, skip: int = 0, limit: int = 100):
    return db.query(chat_model.Chat).offset(skip).limit(limit).all()

def get_chat(db: Session, chat_id: int):
    return db.query(chat_model.Chat).filter(chat_model.Chat.id == chat_id).first()

def get_chats_by_room(db: Session, id_room: int):
    return db.query(chat_model.Chat).options(joinedload(chat_model.Chat.user)).filter(chat_model.Chat.id_room == id_room).all()

def update_chat(db: Session, chat_id: int, chat: chat_schema.ChatUpdate):
    db_chat = db.query(chat_model.Chat).filter(chat_model.Chat.id == chat_id).first()
    if db_chat:
        db_chat.message = chat.message
        db.commit()
        db.refresh(db_chat)
    return db_chat

def delete_chat(db: Session, chat_id: int):
    db_chat = db.query(chat_model.Chat).filter(chat_model.Chat.id == chat_id).first()
    if db_chat:
        db.delete(db_chat)
        db.commit()
    return db_chat