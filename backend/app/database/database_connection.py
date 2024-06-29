from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from utils import DatabaseConfig

username = DatabaseConfig.username
password = DatabaseConfig.password
hostname = DatabaseConfig.hostname
dbname = DatabaseConfig.dbname
port = DatabaseConfig.port

# Thiết lập đường dẫn kết nối đến PostgreSQL
DATABASE_URL = f"postgresql://{username}:{password}@{hostname}:{port}/{dbname}"

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