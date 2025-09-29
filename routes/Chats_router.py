from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base
from pydantic import BaseModel
from datetime import datetime
from models.Chats import Chats
from database import Session_local

router= APIRouter()

def get_db():
    db=Session_local()
    try:
        yield db
    finally:
        db.close()
class Chats_details(BaseModel):
    sender_id: str
    receiver_id: str

@router.post('/create_chat')
def create_chat(chat: Chats_details, db: Session = Depends(get_db)):
    conversation_id = ''.join(sorted([chat.sender_id, chat.receiver_id]))
    existing_conversation = db.query(Chats).filter(Chats.conversation_id == conversation_id).first()
    if existing_conversation:
        return 'already exists'
    else:
        new_conversation = Chats(
            sender_id=chat.sender_id,
            receiver_id=chat.receiver_id,
            conversation_id=conversation_id
        )
        db.add(new_conversation)
        db.commit()
        db.refresh(new_conversation)
        return conversation_id
