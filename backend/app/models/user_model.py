from sqlalchemy import Column, Integer, String
from app.database.database_connection import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    role = Column(Integer)
    username = Column(String)
    password = Column(String)

    rooms = relationship("Room", back_populates="user")
    chats = relationship("Chat", back_populates="user")