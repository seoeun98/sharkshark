from sqlalchemy.orm import Session
from sql_app import models, schemas
import random

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
    result_probs = ""

    probs_by_category = get_probs_by_category(id, db)

    if probs_by_category :
        probs_by_category_list = probs_by_category.split(",")
        size = len(probs_by_category_list)

        index = random.sample(range(0, size + 1), 3)

        for i in range(0, 3):
            result_probs += str(probs_by_category_list[index[i]]) + ","
        print(result_probs)
    probs_by_rival = get_probs_by_rival(id, db)

    if probs_by_rival :
        probs_by_rival_list = probs_by_rival.split(",")
        size = len(probs_by_rival_list)

        index += random.sample(range(0, size + 1), 2)
        result_probs += str(probs_by_rival_list[index[0]]) + ","
        result_probs += str(probs_by_rival_list[index[1]])

    return result_probs



