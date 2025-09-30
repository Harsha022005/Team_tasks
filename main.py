from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import Tasks_router, Chats_router, user_router, teams_router, Messages_router
from database import Base, engine
import models  


print("Tables found before create_all:", Base.metadata.tables.keys())
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")


# 172.22.180.16

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router.router, prefix="/user", tags=["login", "signup"]
)
print("User router included")

app.include_router(teams_router.router, prefix="/team", tags=["create_team"])

app.include_router(Tasks_router.router, prefix="/task", tags=["create_task"])

app.include_router(Chats_router.router, prefix="/chat", tags=["create_chat"])

app.include_router(Messages_router.router, prefix="/message", tags=["ws_chat"])

@app.get("/")
def root():
    return {"message": "Backend is running "}
