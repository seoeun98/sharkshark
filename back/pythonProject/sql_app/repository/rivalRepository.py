from sqlalchemy.orm import Session
from sql_app import models, schemas

def get_rivals_list(user: str, db: Session) :
    return db.query(models.rival).filter(models.rival.userId == user).all()

def put_rival(rivalId, db: Session, user: str) :
    check_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()

    if check_rival is not None: return 0

    db_rival = models.rival(rivalId=rivalId, userId=user)
    db.add(db_rival)
    db.commit()
    db.refresh(db_rival)

    return 1

def delete_rival(rivalId, db: Session, user: str) :
    db_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()

    if db_rival is None : return 0

    db.delete(db_rival)
    db.commit()
    db.refresh(db_rival)

    return 1

def get_rival(rivalId, db: Session) :
    db_rival = db.query(models.BJ_user).filter(models.BJ_user.userId == rivalId).first()

    if db_rival is not None: return db_rival
    else : return 0
