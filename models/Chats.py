from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Chats(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(String, nullable=False)   # ---------created_by
    reciever_id = Column(String, nullable=False)  # ----------team_name
    conversation_id = Column(String, primary_key=True, nullable=False)
    
    