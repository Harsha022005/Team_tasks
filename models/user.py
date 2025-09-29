from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class Role(enum.Enum):
    team_lead = 'Team Lead'
    team_member = 'Team Member'

class User(Base):
    __tablename__ = 'user'
    

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)

    teams=relationship('Teams',back_populates='created_by_user')
    tasks=relationship('Tasks',back_populates='created_by_user')
