
from fastapi import APIRouter, Depends, HTTPException
from requests import Session

from sql_app.database import get_db
from sql_app.repository import dataRepository, jwtRepository
from sql_app.repository.jwtRepository import JWTRepo

router = APIRouter(
    prefix="/data",
    tags=["Datas"]
)

# 티어 상승 로드맵 조회
@router.get("/tier")
def get_tier_roadmap(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_roadMap(userId, db)

    if result:
        return {"user":result[0], "rivals":result[1]}
    raise HTTPException(status_code=401, detail="no item")

# 주요 유형 조회
@router.get("/category/{id}")
def get_major_category(id, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    # userId = JWTRepo.decode_token(user)
    result = dataRepository.get_major_category(id, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

# 주요 유형 조회
@router.get("/categoryavg")
def get_major_category(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_major_category_avg(userId, db)    

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

# 기간별 문제 풀이 조회
@router.get("/history")
def get_history(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_period_problem(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")


# 주요 오답 유형 조회
@router.get("/wrong")
def get_major_wrong(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_major_wrong(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

@router.get("/levelavg")
def get_level_avg(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)    
    pb_list, lv_avg = dataRepository.get_level_avg(userId, db)
    return {"level_avg" : lv_avg, "list" : pb_list}

@router.get("/pbperweek")
def get_pb_per_week(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_pb_per_week(userId, db)
    return result