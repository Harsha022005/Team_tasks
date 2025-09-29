from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base
from pydantic import BaseModel
from datetime import datetime
from models.Tasks import Tasks
from models.Teams import Teams
from database import Session_local

router = APIRouter()

def get_db():
    db=Session_local()
    try:
        yield db 
    finally:
        db.close()

class TaskCreate(BaseModel):
    team_name: str
    title: str
    description: str
    created_by: str

@router.post('/create_task')
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    team = db.query(Teams).filter(Teams.team_name == task.team_name).first()
    if not team:
        raise HTTPException(status_code=404, detail='Team name does not exist')
    new_task = Tasks(
        team_id=team.id,
        title=task.title,
        description=task.description,
        created_by=task.created_by,
        created_at=datetime.utcnow()
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
