import string
from typing import List

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
import requests

import sql_app.models
from sql_app import schemas
from sql_app.database import get_db
from sql_app.repository import userRepository, jwtRepository
from sql_app.repository.jwtRepository import JWTRepo
from sql_app.service import crowling

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
        raise HTTPException(status_code=401, detail="already registered")

# 상태메세지 문구 넘겨주기
@router.post("/confirm/{id}")
def pass_message(id, db: Session = Depends(get_db)):
    # 백준 유저인지 확인
    user_msg = user_message_crawling(id)
    # 백준 유저가 아닐 경우
    if user_msg == 'Not-Found-User':
        return HTTPException(status_code=401, detail="not BOJ user")        
    # solved.ac 연동이 되어있는지 확인
    if not crowling.is_in_solvedac(id):
        return HTTPException(status_code=401, detail="not solved.ac user")
    # DB(bj user 테이블)에 없는 아이디일 경우 
    if not userRepository.get_bjuser_by_id(id, db):
        return HTTPException(status_code=401, detail="not on bj_user")

    user = userRepository.get_by_id(id, db)
    result = userRepository.set_message(id, db)
    
    # 이미 가입한 유저
    if user:
        return {"msg": result, "detail": "already registered"}
    
    return {"msg": result, "detail": "new user"}

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
        return JSONResponse(status_code=401, content=dict(detail="가입된 아이디가 없습니다"))

    elif newUser == "not correct pw" :
        return JSONResponse(status_code=401, content=dict(detail="패스워드가 일치하지 않습니다"))
    else:
        access_token = jwtRepository.JWTRepo.generate_access_token({"id": newUser.id})
        refresh_token = jwtRepository.JWTRepo.generate_refresh_token({"id": newUser.id})

        print("발급된 access_token : " + access_token)
        print("발급된 refresh_token : " + refresh_token)

        jwtRepository.JWTRepo.set_auth(refresh_token, newUser.id, db)

        return {"access_token": access_token, "refresh_token" : refresh_token}

    return JSONResponse(status_code=400, content=dict(detail="NOT_SUPPORTED"))

# 계정 정보 조회
@router.get("/{id}", response_model=schemas.getUser, dependencies=[Depends(jwtRepository.JWTBearer())], status_code=200)
def get_by_id(id: str, db: Session = Depends(get_db)):
    user = userRepository.get_by_id(id, db)
    if user:
        return user
    raise JSONResponse(status_code=500, content=dict(detail="NOT_UPDATED"))

# 계정 정보 업데이트
@router.put("")
def update_by_id(request: schemas.updateUser, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    user_id = JWTRepo.decode_token(user)
    return userRepository.update_user(user_id, request, db)

# 계정 비밀번호 재설정
@router.put("/pw")
def update_pw_by_id(request: schemas.User, db: Session = Depends(get_db)):
    id = request.id
    userMsg = user_message_crawling(id)

    if userRepository.check_message(id, userMsg, db) == -1:
        raise HTTPException(status_code=401, detail="not certified")

    user = userRepository.get_by_id(id, db)
    if user:
        user.pw = request.pw
        # 인증 메시지 제거
        if userRepository.delete_user_msg(id, db):
            # 유저 비밀번호 업데이트
            if userRepository.update_user(id, user, db):    
                return True
        else:
            raise HTTPException(status_code=401, detail="msg already used")                

    raise HTTPException(status_code=401, detail="not registered")

# 회원 탈퇴
@router.delete("", dependencies=[Depends(jwtRepository.JWTBearer())])
def delete_by_id(request: schemas.User, db: Session = Depends(get_db)):
    return userRepository.delete_user(request, db)

# github authorizationCode로 github access token 발급
@router.post("/github", status_code=200)
def get_github_access_token(request: schemas.authorizationCode, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    user_id = JWTRepo.decode_token(user)
    # github token post 요청
    client_id = '9539ff1ae93c2ccb932b'
    client_secret = '76ec7c09e6681a619b287b7d311f2753782ecb16'    
    res = requests.post(f'http://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code=' + request.authorizationCode)
    # 요청 상태 코드 확인
    if res.status_code == 200:
        github_access_token = res.text.split("&")[0].split("=")[1]
        if 'error' in github_access_token or 'bad_verification_code' in github_access_token:
            raise HTTPException(status_code=401, detail="code already used")
        user = userRepository.get_by_id(user_id, db)
        if user:
            update_user = sql_app.models.User()
            update_user.id = user.id
            update_user.token = github_access_token        
            userRepository.update_user(user_id, update_user, db)

            return {"github_access_token": github_access_token}
    raise HTTPException(status_code=401, detail="github connection error")