from sqlalchemy.orm import Session
from sql_app import models, schemas

def get_recommend_rivals_list(user: str, db: Session) :
    rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == user).first().__dict__
    list = rivals['rivalIds'].split(',')
    result_list = []

    for one in list:
        result_list.append(get_rival(one, db))
    return result_list

def get_rivals_list(user: str, db: Session) :
    rivals = db.query(models.rival).filter(models.rival.userId == user).first().__dict__
    list = rivals['rivalIds'].split(',')
    result_list = []

    for one in list:
        result_list.append(get_rival(one, db))
    return result_list

def put_rival(rivalId, db: Session, user: str) :
    check_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()

    if check_rival: return False

    db_rival = models.rival(rivalId=rivalId, userId=user)
    db.add(db_rival)
    db.commit()
    db.refresh(db_rival)

    return True

def delete_rival(rivalId, db: Session, user: str) :
    db_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()

    if not db_rival : return False

    db.delete(db_rival)
    db.commit()
    db.refresh(db_rival)

    return True

def get_rival(rivalId, db: Session) :
    db_rival = db.query(models.BJ_user).filter(models.BJ_user.userId == rivalId).first()

    if db_rival: return db_rival
    else : return False
