import bcrypt
from sqlalchemy.orm import Session
from sql_app import models, schemas

def create_user(user: schemas.User, db: Session):
    check_user = db.query(models.User).filter(models.User.id == user.id).first()

    # 이미 존재하는 유저면 리턴
    if check_user is not None: return 0

    hashed_pw = bcrypt.hashpw(user.pw.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(id=user.id, pw=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return 1

def login_user(user: schemas.User, db: Session):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()

    if db_user and bcrypt.checkpw(user.pw.encode('utf-8'), db_user.pw.encode('utf-8')):
        return db_user
    else : return None

def get_by_id(id: str, db: Session):
    db_user = db.query(models.User).filter(models.User.id == id).first()

    if db_user:
        return db_user
    else: return 0

def set_message(id: str, msg : str, db : Session):
    db_user = db.query(models.User).filter(models.User.id == id)

    if not db_user.first():
        db_user.update({'msg' : msg})
        db.commit()
        return 1
    else : return 0

# BJ의 프로필 메세지 체크
def check_message(id: str, msg: str, db : Session) :
    db_user = db.query(models.User).filter(models.User.id == id).first()

    if db_user:
        db_user_msg = db_user.msg
        return msg.find(db_user_msg)
    return 0



def update_user(user: schemas.updateUser, db: Session):
    db_user = db.query(models.User).filter(models.User.id == user.id)

    if db_user.first():
        db_user.update({'pw': bcrypt.hashpw(user.pw.encode('utf-8'), bcrypt.gensalt()), 'git': user.git, 'dir': user.dir, 'token': user.token})
        db.commit()
        return 1
    else: return 0

def delete_user(user: schemas.User, db: Session):
    db_user = db.query(models.User).filter(models.User.id == user.id)

    if db_user.first():
        db_user.delete()
        db.commit()
        return 1
    else: return 0

def get_all_user(db: Session):
    db_users = db.query(models.User).all()

    if not db_users:
        return None
    else: return db_users

