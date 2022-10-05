
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from sql_app import schemas
from sql_app.database import get_db

from sql_app.repository import problemsRepository, jwtRepository, rivalRepository
from sql_app.repository.jwtRepository import JWTRepo
from sql_app.service import crowling

router = APIRouter(
    prefix="/prob",
    tags=["Problems"]
)

@router.get("", status_code=200)
def get_probs_by_rival(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = problemsRepository.get_probs_by_rival(userId, db)

    if result :
        return result
    raise HTTPException(status_code=401, detail="no item")

@router.get("/category")
def get_probs_by_category(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = problemsRepository.get_probs_by_category(userId, db)

    if result :
        return result
    raise HTTPException(status_code=401, detail="no item")

@router.get("/mock")
def get_probs_for_mock(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    result = problemsRepository.get_probs_for_mock(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

@router.get("/recent")
def get_recent_5_probs(db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    prob_list = crowling.get_status_crawling(userId, '')
    result = problemsRepository.get_recent_5_probs(prob_list[0:5], db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")

@router.post("/mockres")
def get_mockRes(request: schemas.getMockRes, user: str = Depends(jwtRepository.JWTBearer())) :
    userId = JWTRepo.decode_token(user)
    return crowling.get_mockRes(userId, request.probNo, request.start)

@router.get("/detail/{probNo}")
def get_prob_detail(probNo: int, user: str = Depends(jwtRepository.JWTBearer())) :    
    detail = crowling.get_prob_detail(probNo)
    if detail is not None:
        return detail
    else:
        return HTTPException(status_code=401, detail="no item")

@router.get("/tags/{tagName}")
def get_probs_by_tags(tagName: str, db: Session = Depends(get_db), user: str = Depends(jwtRepository.JWTBearer())):
    userId = JWTRepo.decode_token(user)
    result = problemsRepository.get_probs_by_tag(userId, tagName, db);

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")