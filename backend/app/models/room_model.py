from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database.database_connection import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    id_user = Column(Integer, ForeignKey('users.id'))
    create_at = Column(DateTime, default=func.now())
    update_at = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="rooms")
    chats = relationship("Chat", back_populates="room")