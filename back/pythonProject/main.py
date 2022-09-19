from fastapi import FastAPI

from sql_app import models
from sql_app.database import engine
from sql_app.routers import users, rivals

app = FastAPI()

models.Base.metadata.create_all(engine)

app.include_router(users.router)
app.include_router(rivals.router)