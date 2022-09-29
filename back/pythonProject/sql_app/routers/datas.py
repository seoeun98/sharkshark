from typing import Optional


from fastapi import APIRouter, Depends, HTTPException
from requests import Session

from sql_app.database import get_db
from sql_app.repository import dataRepository, jwtRepository
from sql_app.repository.jwtRepository import JWTRepo
from sql_app.schemas import Period

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
        return result
    raise HTTPException(status_code=401, detail="no item")

# 주요 유형 조회
@router.get("/category")
def get_major_category(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_major_category(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

# 기간별 문제 풀이 조회
@router.post("/history")
def get_history(period: Period, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    result = dataRepository.get_period_problem(period, userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")


# 주요 오답 유형 조회
@router.get("/wrong")
def get_major_wrong(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = dataRepository.dataRepository.get_major_wrong(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")
