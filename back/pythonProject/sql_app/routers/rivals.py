
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sql_app.repository import rivalRepository, jwtRepository, problemsRepository
from sql_app.repository.jwtRepository import JWTRepo
from sql_app.service import crowling

from sql_app.database import get_db

router = APIRouter(
    prefix="/rival",
    tags=["Rivals"]
)

# 추천 사용자 목록을 불러온다
@router.get("")
def get_recommend_rival_list(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)    
    if userId:
        result = rivalRepository.get_recommend_rivals_list(userId, db)
        if result is None:
            return rivalRepository.get_upper_users(userId, db)            
        return result
    raise HTTPException(status_code=401, detail="not authorized")

# 라이벌들이 최근에 푼 5문제
@router.get("/recent")
def get_rivals_recent_5_probs(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)

    rival_list = {}
    rivals = rivalRepository.get_recommend_rivals_list(userId, db)

    for rival in rivals:
        rival_id = rival.__dict__['userId']

        prob_list = crowling.get_status_crawling(rival_id, '')
        result_rival = problemsRepository.get_recent_5_probs(prob_list[0:5], db)
        rival_list[rival_id] = result_rival

    if rival_list:
        return rival_list
    raise HTTPException(status_code=401, detail="no item")

# 등록한 라이벌 목록을 조회한다
@router.get("/list")
def get_rival_list(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    if userId:
        return rivalRepository.get_rivals_list(userId, db)
    raise HTTPException(status_code=401, detail="not authorized")

# 라이벌을 등록한다. (등록할 라이벌의 id를 pathVariable에 넣는다)
@router.post("/{id}", status_code=200)
def put_rival(id, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    result = rivalRepository.put_rival(id, db, userId)
    if result == 0:
        raise HTTPException(status_code=401, detail="already registered")
    elif result == 2:
        raise HTTPException(status_code=401, detail="not on bj_user")


# 라이벌을 삭제한다. (삭제할 라이벌의 id를 pathVariable에 넣는다)
@router.delete("/{id}", status_code=200)
def delete_rival(id, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    if not rivalRepository.delete_rival(id, db, userId):
        raise HTTPException(status_code=404, detail="Item not found")

# 라이벌 한 명의 정보를 조회한다. 조회할 라이벌의 id를 pathVariable에 넣는다
@router.get("/{id}", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_rival(id, db: Session = Depends(get_db)) :
    result = rivalRepository.get_rival(id, db)

    if result == 0: raise HTTPException(status_code=404, detail="Item not found")

    return result
