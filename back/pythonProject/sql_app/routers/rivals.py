from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sql_app.repository import rivalRepository

import sql_app.models
from sql_app.database import get_db

router = APIRouter(
    prefix="/rival",
    tags=["Rivals"]
)

@router.get("")
def get_rival_list(db: Session = Depends(get_db)) :
    return db.query(sql_app.models.rival).all()

@router.post("/{id}", status_code=200)
def put_rival(id, db: Session = Depends(get_db)):
    if rivalRepository.put_rival(id, db) == 0:
        raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{id}", status_code=200)
def delete_rival(id, db: Session = Depends(get_db)) :
    if rivalRepository.delete_rival(id, db) == 0:
        raise HTTPException(status_code=404, detail="Item not found")

@router.get("/{id}")
def get_rival(id, db: Session = Depends(get_db)) :
    result = rivalRepository.get_rival(id, db)

    if result == 0: raise HTTPException(status_code=404, detail="Item not found")

    return result
