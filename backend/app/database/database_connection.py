from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_HOST = os.getenv('POSTGRESQL_ADDON_HOST')
DATABASE_NAME = os.getenv('POSTGRESQL_ADDON_DB')
DATABASE_USER = os.getenv('POSTGRESQL_ADDON_USER')
DATABASE_PASSWORD = os.getenv('POSTGRESQL_ADDON_PASSWORD')
DATABASE_PORT = os.getenv('POSTGRESQL_ADDON_PORT')

# Thiết lập đường dẫn kết nối đến PostgreSQL
DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

# Tạo đối tượng engine và sessionmaker
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)

def reset_tables():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)