from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import user_crud
from app.schemas import user_schema
from app.database.database_connection import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db=db, user=user)

@router.get("/", response_model=list[user_schema.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user_crud.get_users(db=db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=user_schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.put("/{user_id}", response_model=user_schema.User)
def update_user(user_id: int, user: user_schema.UserUpdate, db: Session = Depends(get_db)):
    db_user = user_crud.update_user(db=db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}", response_model=user_schema.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.delete_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user