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

# refresh token으로 새로운 access token 발급해주기
@router.post("/auth", status_code=200)
def new_access_token(db: Session = Depends(get_db), refresh_token: str = Header(None)):
    token = jwtRepository.JWTRepo.create_new_access_token(refresh_token, db)
    if token:
        print("새로운 access_token: " + token)
        return {"access_token":token}
    raise HTTPException(status_code=401, detail="need re-login")


# 회원가입
@router.post("/regist", status_code=200)
def regist(request: schemas.User, db: Session = Depends(get_db)):
    result = userRepository.create_user(request, db)

    if not result:
        raise HTTPException(status_code=404, detail="not registered")

# 상태메세지 문구 넘겨주기
@router.post("/confirm/{id}")
def pass_message(id, db: Session = Depends(get_db)):
    result = userRepository.set_message(id, db)
    return {"msg": result}

# 입력 확인 완료
@router.get("/confirm/{id}", status_code=200)
def confirm_message(id, db: Session = Depends(get_db)):
    userMsg = user_message_crawling(id)

    if userRepository.check_message(id, userMsg, db) == -1:
        raise HTTPException(status_code=401, detail="not certified")

# 전체 유저 조회
@router.get("", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_all_user(db: Session = Depends(get_db)):
    return db.query(sql_app.models.User).all()

# 로그인
@router.post("/login")
def login(request: schemas.User, db: Session = Depends(get_db)):
    newUser = userRepository.login_user(request, db)

    if newUser == "no user":
        return JSONResponse(status_code=401, content=dict(msg="가입된 아이디가 없습니다"))

    elif newUser == "not correct pw" :
        return JSONResponse(status_code=401, content=dict(msg="패스워드가 일치하지 않습니다"))
    else:
        access_token = jwtRepository.JWTRepo.generate_access_token({"id": newUser.id})
        refresh_token = jwtRepository.JWTRepo.generate_refresh_token({"id": newUser.id})

        print("발급된 access_token : " + access_token)
        print("발급된 refresh_token : " + refresh_token)

        jwtRepository.JWTRepo.set_auth(refresh_token, newUser.id, db)

        return {"access_token": access_token, "refresh_token" : refresh_token}

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