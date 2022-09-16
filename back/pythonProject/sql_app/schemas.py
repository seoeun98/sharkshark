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

# class UserCreate(User):
#     pw: str
#
# class showUser(UserBase):
#
#     class Config:
#         orm_mode = True