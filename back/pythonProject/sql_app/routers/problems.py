from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import sql_app.models
from sql_app import schemas
from sql_app.database import get_db

from sql_app.repository import ProblemsRepository

router = APIRouter(
    prefix="/prob",
    tags=["Problems"]
)

@router.get("")
def get_probs_list(db: Session = Depends(get_db)) :
    return None;

@router.get("/category")
def get_probs_by_category(db: Session = Depends(get_db)) :
    return None

@router.get("/mock")
def get_probs_for_mock(db: Session = Depends(get_db)) :
    return None