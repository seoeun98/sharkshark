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

    class Config:
        orm_mode = True

class updateUser(BaseModel):
    pw: Optional[str] = None
    git: Optional[str] = None
    token: Optional[str] = None
    dir: Optional[str] = None


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

class proCntPerDay(BaseModel):
    proCnt:int
    day: datetime.date

class authorizationCode(BaseModel):
    authorizationCode:str

class getMockRes(BaseModel):
    probNo: int
    start: str