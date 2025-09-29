from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base
from models.user import User
from models.Teams import Teams
from pydantic import BaseModel
from datetime import datetime, timedelta
from database import Session_local

router = APIRouter()

def get_db():
    db=Session_local()
    try:
        yield db
    finally:
        db.close()
class CreateTeam(BaseModel):
    team_name: str
    team_members: list
    created_by: str
    created_by:str
    
@router.post('/create_team')
def create_team(team: CreateTeam, db: Session = Depends(get_db)):
    existing = db.query(Teams).filter(Teams.team_name == team.team_name).first()
    if existing:
        raise HTTPException(status_code=400, detail='Team name already exists')
    new_team = Teams(
        team_name=team.team_name,
        team_members=team.team_members,
        created_by=team.created_by
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team
