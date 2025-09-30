from sqlalchemy import Column, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Tasks(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    mp = Column(JSON, default=dict)

    created_by = Column(Integer, ForeignKey('user.id'))
    created_by_user = relationship('User', back_populates='tasks')

