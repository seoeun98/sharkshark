from typing import Optional

from fastapi import APIRouter, Depends, Header
from requests import Session

from sql_app.database import get_db
from sql_app.repository import jwtRepository

router = APIRouter(
    prefix="/data",
    tags=["Datas"]
)

# 티어 상승 로드맵 조회
@router.get("/tier", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_tier_roadmap(db: Session = Depends(get_db), user: Optional[str] = Header(None)) :
    return None

# 주요 유형 조회
@router.get("/category", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_major_cate(db: Session = Depends(get_db), user: Optional[str] = Header(None)) :
    return None

# 기간별 문제 풀이 조회
@router.get("/history", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_history(db: Session = Depends(get_db), user: Optional[str] = Header(None)) :
    return None

# 주요 오답 유형 조회
@router.get("/wrong", dependencies=[Depends(jwtRepository.JWTBearer())])
def get_major_wrong(db: Session = Depends(get_db), user: Optional[str] = Header(None)) :
    return None
