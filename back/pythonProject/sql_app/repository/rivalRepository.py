from sqlalchemy.orm import Session
from sql_app import models, schemas

def get_recommend_rivals_list(user: str, db: Session) :
    try:
        rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == user).first().__dict__        
    except Exception as e:
        # 추천 테이블에 없는 경우 -> bj_user 에 없는 경우
        raise None
    list = rivals['rivalIds'].split(',')
    result_list = []
    print(list)
    for one in list:
        result_list.append(get_rival(one, db))
    return result_list

def get_rivals_list(user: str, db: Session) :
    rivals = db.query(models.rival).filter(models.rival.userId == user).all()

    result_list = []

    for one in rivals:
        result_list.append(get_rival(one.rivalId, db))
    return result_list

def put_rival(rivalId, db: Session, user: str) :
    check_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()
    # print(check_rival.rivalId)

    # 이미 등록된 경우
    if check_rival: 
        return 0    

    try:
        db_rival = models.rival(rivalId=rivalId, userId=user)
        db.add(db_rival)
        db.commit()        

        return True
    # bj_user table에 없는 경우
    except Exception as e:
        return 2        

def delete_rival(rivalId, db: Session, user: str) :
    db_rival = db.query(models.rival).filter(models.rival.rivalId == rivalId).filter(models.rival.userId == user).first()

    if not db_rival : return False

    db.delete(db_rival)
    db.commit()

    return True

def get_rival(rivalId, db: Session) :
    db_rival = db.query(models.BJ_user).filter(models.BJ_user.userId == rivalId).first()

    if db_rival: return db_rival
    else : return False
