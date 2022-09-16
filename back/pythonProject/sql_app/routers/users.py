import string
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import sql_app.models
from sql_app import schemas
from sql_app.database import get_db
from sql_app.repository import userRepository

import random

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

# 회원가입
@router.post("/regist")
def regist(request: schemas.User, db: Session = Depends(get_db)):
    return userRepository.create_user(request, db)

# 상태메세지 문구 넘겨주기
@router.post("/confirm/{id}")
def pass_message(id, db: Session = Depends(get_db)):
    _LENGTH=6
    string_poll = string.ascii_lowercase
    result = ""

    for i in range(_LENGTH) :
        result += random.choice(string_poll)

    if userRepository.set_message(id, result, db) != 0:
     return result
    else: return -1

# 입력 확인 완료
@router.get("/confirm/{id}")
def confirm_message(id, db: Session = Depends(get_db)):
    return 1

# 전체 유저 조회
@router.get("")
def get_all_user(db: Session = Depends(get_db)):
    return db.query(sql_app.models.User).all()

# 로그인
@router.post("/login")
def login(request: schemas.User, db: Session = Depends(get_db)):
    return userRepository.login_user(request, db)

# 계정 정보 조회
@router.get("/{id}", response_model=schemas.getUser)
def get_by_id(id: str, db: Session = Depends(get_db)):
    return userRepository.get_by_id(id, db)

# 계정 정보 업데이트
@router.put("")
def update_by_id(request: schemas.updateUser, db: Session = Depends(get_db)):
    return userRepository.update_user(request, db)

# 회원 탈퇴
@router.delete("")
def delete_by_id(request: schemas.User, db: Session = Depends(get_db)):
    return userRepository.delete_user(request, db)