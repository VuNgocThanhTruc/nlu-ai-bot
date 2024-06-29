from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.crud import chat_crud
from app.schemas import chat_schema
from typing import List
from app.database.database_connection import get_db

router = APIRouter()

@router.post("/", response_model=chat_schema.Chat)
def create_chat(chat: chat_schema.ChatCreate, db: Session = Depends(get_db)):
    return chat_crud.create_chat(db=db, chat=chat)

@router.get("/", response_model=list[chat_schema.Chat])
def read_chats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return chat_crud.get_chats(db=db, skip=skip, limit=limit)

@router.get("/{chat_id}", response_model=chat_schema.Chat)
def read_chat(chat_id: int, db: Session = Depends(get_db)):
    db_chat = chat_crud.get_chat(db=db, chat_id=chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return db_chat

@router.put("/{chat_id}", response_model=chat_schema.Chat)
def update_chat(chat_id: int, chat: chat_schema.ChatUpdate, db: Session = Depends(get_db)):
    db_chat = chat_crud.update_chat(db=db, chat_id=chat_id, chat=chat)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return db_chat

@router.delete("/{chat_id}", response_model=chat_schema.Chat)
def delete_chat(chat_id: int, db: Session = Depends(get_db)):
    db_chat = chat_crud.delete_chat(db=db, chat_id=chat_id)
    if db_chat is None:
        raise HTTPException(status_code=404, detail="Chat not found")
    return db_chat