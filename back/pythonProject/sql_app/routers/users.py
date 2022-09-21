import string
from typing import List

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

import sql_app.models
from sql_app import schemas
from sql_app.database import get_db
from sql_app.repository import userRepository, jwtRepository

from util import user_message_crawling

import random

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

# 회원가입
@router.post("/regist", status_code=200)
def regist(request: schemas.User, db: Session = Depends(get_db)):
    result = userRepository.create_user(request, db)

    if result == 0:
        raise HTTPException(status_code=404, detail="not registered")

# 상태메세지 문구 넘겨주기
@router.post("/confirm/{id}")
def pass_message(id, db: Session = Depends(get_db)):
    d={}

    _LENGTH=6
    string_poll = string.ascii_lowercase
    result = ""

    for i in range(_LENGTH) :
        result += random.choice(string_poll)

    if userRepository.set_message(id, result, db) != 0:
        d['msg'] = result
        return d
    else: return -1

# 입력 확인 완료
@router.get("/confirm/{id}", status_code=200)
def confirm_message(id, db: Session = Depends(get_db)):
    userMsg = user_message_crawling(id)

    if not userRepository.check_message(id, userMsg, db) :
        raise HTTPException(status_code=401, detail="not certified")
# 전체 유저 조회
@router.get("", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_all_user(db: Session = Depends(get_db)):
    return db.query(sql_app.models.User).all()

# 로그인
@router.post("/login")
def login(request: schemas.User, db: Session = Depends(get_db)):
    d={}

    newUser = userRepository.login_user(request, db)

    if newUser:
        token = jwtRepository.JWTRepo.generate_token({"sub": newUser.id})
        print("발급된 token : " + token)
        d['access_token']=token
        return d

    return JSONResponse(status_code=400, content=dict(msg="NOT_SUPPORTED"))

# 계정 정보 조회
@router.get("/{id}", response_model=schemas.getUser, dependencies=[Depends(jwtRepository.JWTBearer())])
def get_by_id(id: str, db: Session = Depends(get_db)):
    return userRepository.get_by_id(id, db)

# 계정 정보 업데이트
@router.put("", dependencies=[Depends(jwtRepository.JWTBearer())])
def update_by_id(request: schemas.updateUser, db: Session = Depends(get_db), access_token: str = Header(None)):
    return userRepository.update_user(request, db)

# 회원 탈퇴
@router.delete("", dependencies=[Depends(jwtRepository.JWTBearer())])
def delete_by_id(request: schemas.User, db: Session = Depends(get_db)):
    return userRepository.delete_user(request, db)