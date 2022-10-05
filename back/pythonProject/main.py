from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from sql_app import models
from sql_app.database import engine
from sql_app.routers import users, rivals, problems, datas

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

app.include_router(users.router)
app.include_router(rivals.router)
app.include_router(problems.router)
app.include_router(datas.router)