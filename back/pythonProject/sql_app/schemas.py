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

# class UserCreate(User):
#     pw: str
#
# class showUser(UserBase):
#
#     class Config:
#         orm_mode = True