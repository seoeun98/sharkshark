from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from sql_app.repository import rivalRepository, jwtRepository
from sql_app.repository.jwtRepository import JWTRepo

import sql_app.models
from sql_app.database import get_db

router = APIRouter(
    prefix="/rival",
    tags=["Rivals"]
)

# 추천 사용자 목록을 불러온다
@router.get("", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_rival_list(db: Session = Depends(get_db), user: Optional[str] = Header(None)):
    userId = JWTRepo.decode_token(user)
    if userId:
        return rivalRepository.get_rivals_list(userId, db)
    raise HTTPException(status_code=401, detail="not authorized")

# 라이벌을 등록한다. (등록할 라이벌의 id를 pathVariable에 넣는다)
@router.post("/{id}", status_code=200, dependencies=[Depends(jwtRepository.JWTBearer())])
def put_rival(id, db: Session = Depends(get_db), user: Optional[str] = Header(None)):
    userId = JWTRepo.decode_token(user)
    if rivalRepository.put_rival(id, db, userId):
        raise HTTPException(status_code=404, detail="Item not found")

# 라이벌을 삭제한다. (삭제할 라이벌의 id를 pathVariable에 넣는다)
@router.delete("/{id}", status_code=200, dependencies=[Depends(jwtRepository.JWTBearer())])
def delete_rival(id, db: Session = Depends(get_db), user: Optional[str] = Header(None)):
    userId = JWTRepo.decode_token(user)
    if rivalRepository.delete_rival(id, db, userId):
        raise HTTPException(status_code=404, detail="Item not found")

# 라이벌 한 명의 정보를 조회한다. 조회할 라이벌의 id를 pathVariable에 넣는다
@router.get("/{id}", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_rival(id, db: Session = Depends(get_db)) :
    result = rivalRepository.get_rival(id, db)

    if result == 0: raise HTTPException(status_code=404, detail="Item not found")

    return result
