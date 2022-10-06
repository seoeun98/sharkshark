from sqlalchemy.orm import Session
from sql_app import models, schemas
from sql_app.repository import userRepository

def get_recommend_rivals_list(user: str, db: Session) :
    try:
        rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == user).first().__dict__        
    except Exception as e:
        # 추천 테이블에 없는 경우 -> bj_user 에 없는 경우
        raise None
    # 추천 유저
    list = rec_rivals['rivalIds'].split(',')    
    # 등록된 라이벌
    rivals = db.query(models.rival).filter(models.rival.userId == user).all()    
    rivals_ = ','.join([str(x.rivalId) for x in rivals]) 
    rivals_list = rivals_.split(',')    

    result_list = []    
    for one in list:
        # 등록되지 않은 유저만 추천
        if one not in rivals_list:
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

def get_upper_users(user: str, db: Session):
    user_no = userRepository.get_by_id(user, db).no
    # 나보다 윗 등수 유저
    upper_users = db.query(models.BJ_user).filter(models.BJ_user.no.in_(range(user_no - 8,user_no))).all()
    
    # 등록된 라이벌
    rivals = db.query(models.rival).filter(models.rival.userId == user).all()    
    rivals_ = ','.join([str(x.rivalId) for x in rivals]) 
    rivals_list = rivals_.split(',')    

    result_list = []    
    for one in upper_users:
        # 등록되지 않은 유저만 추천
        if one.userId not in rivals_list:
            result_list.append(one)

    return result_list