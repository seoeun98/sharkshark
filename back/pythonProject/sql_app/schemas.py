import datetime
from typing import Optional

from pydantic import BaseModel

class User(BaseModel):
    id: str
    pw: str

class getUser(BaseModel):
    id: str
    token: str
    git: str
    dir: str
    msg : str

    class Config:
        orm_mode = True

class updateUser(User):
    git:str
    token: str
    dir:str


class Rival(BaseModel):
    userId: str
    rivalId: str

    class Config:
        orm_mode = True

class Problem(BaseModel):
    no: int
    title: str

    class Config:
        orm_mode = True

class Output(BaseModel) :
    msg: Optional[str] = None
    access_token: Optional[str] = None

class Period(BaseModel) :
    startDate: datetime.date
    endDate: datetime.date

class proCntPerDay(BaseModel):
    proCnt:int
    day: datetime.date