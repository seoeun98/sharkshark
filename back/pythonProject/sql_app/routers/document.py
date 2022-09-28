from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from requests import Session

from sql_app.database import get_db
from sql_app.repository import jwtRepository, documentRepository
from sql_app.repository.jwtRepository import JWTRepo

router = APIRouter(
    prefix="/doc",
    tags=["Docs"]
)

@router.post("", dependencies=[Depends(jwtRepository.JWTBearer())], status_code=200)
def create_docs(db: Session = Depends(get_db), user: Optional[str] = Header(None)) :
    userId = JWTRepo.decode_token(user)
    result = documentRepository.create_doc(userId, db)

    if result:
        return result
    raise HTTPException(status_code=401, detail="no item")