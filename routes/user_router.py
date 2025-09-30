from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base
from models.user import User 
from pydantic import BaseModel
from jose import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from database import Session_local

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
secretkey = 'harsha'
token_exp = 5
def get_db():
    db = Session_local()
    try:
        yield db
    finally:
        db.close()

class UserCreate(BaseModel):
    user_name: str 
    email: str 
    password: str 
    bio: str
    role: str

class UserLogin(BaseModel):
    email: str 
    password: str
    role: str
    
def get_pass_hash(password):
    return pwd_context.hash(password)

def get_verify_hash(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)
def generate_token(data: dict):
    expiry = datetime.utcnow() + timedelta(minutes=token_exp)
    data.update({'exp': expiry})
    return jwt.encode(data, secretkey, algorithm="HS256")
   
@router.post('/signup')
def create_account(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=404, detail='Account already exists')
    if len(user.password) > 72:
        raise HTTPException(status_code=400, detail="Password too long. Must be less than 72 characters.")

    hashed_password = get_pass_hash(user.password)
    new_user = User(
        user_name=user.user_name,
        email=user.email,
        password=hashed_password,
        bio=user.bio,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post('/login')
def account_login(user: UserLogin, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if not existing or not get_verify_hash(user.password, existing.password):
        raise HTTPException(status_code=404, detail='Account does not exist or password is incorrect')

    token = generate_token({
        'user_email': user.email,
        'role': existing.role.value if hasattr(existing.role, 'value') else existing.role
    })

    return {'access_token': token}
  