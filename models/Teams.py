from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

class Teams(Base):
    __tablename__ = 'teams'

    id = Column(Integer, primary_key=True, index=True)
    team_name = Column(String, nullable=False)
    created_by = Column(Integer, ForeignKey('user.id')) 
    created_at = Column(DateTime, default=datetime.utcnow)

    created_by_user = relationship('User', back_populates='teams')
