from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database.database_connection import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    id_room = Column(Integer, ForeignKey('rooms.id'))
    create_at = Column(DateTime, default=func.now())
    id_user = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="chats")
    room = relationship("Room", back_populates="chats")