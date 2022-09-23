from sqlalchemy.orm import Session
from sql_app import models, schemas

def get_probs_by_rival(id: str, db: Session):
    db_user = db.query(models.rec_problems).filter(models.rec_problems.userId == id).first()

    if db_user:
        return db_user.problems
    return None

def get_probs_by_category(id: str, db: Session):
    db_user = db.query(models.rec_problems_tag).filter(models.rec_problems_tag.userId == id).first()

    if db_user:
        return db_user.problems
    return None

def get_probs_for_mock(id: str, db: Session):
    return None