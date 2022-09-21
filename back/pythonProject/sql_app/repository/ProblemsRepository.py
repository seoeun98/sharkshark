from sqlalchemy.orm import Session
from sql_app import models, schemas

def get_probs_list(id: str, db: Session):
    db_user = db.query(models.problem).filter(models.User.id == id)
    return None

def get_probs_by_rival(db: Session):
    return None

def get_probs_by_category(db: Session):
    return None

def get_probs_for_mock(db: Session):
    return None