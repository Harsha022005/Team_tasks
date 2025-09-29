from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from models.Chats import Chats
from datetime import datetime

class Messages(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(String, nullable=False)
    message = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
        