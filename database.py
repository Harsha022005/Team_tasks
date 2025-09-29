from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

database_url = "postgresql+psycopg2://postgres:123456@localhost:5432/Teams_task"

engine=create_engine(database_url)
Base=declarative_base()
Session_local=sessionmaker(autocommit=False, autoflush=False, bind=engine)

