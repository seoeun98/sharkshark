from sqlalchemy.orm import Session
from sql_app import models, schemas
import random

def get_probs_by_rival(id: str, db: Session):
    prob_list = db.query(models.rec_problems).filter(models.rec_problems.userId == id).first().problems.split(',')
    result_list = []

    for prob_no in prob_list :
        prob = db.query(models.problem).filter(models.problem.no == int(prob_no)).first()
        result_list.append(prob)

    return result_list

def get_probs_by_category(id: str, db: Session):
    prob_list = db.query(models.rec_problems_tag).filter(models.rec_problems_tag.userId == id).first().problems.split(',')
    result_list = []

    for prob_no in prob_list:
        prob = db.query(models.problem).filter(models.problem.no == int(prob_no)).first()
        result_list.append(prob)

    return result_list

def get_probs_for_mock(id: str, db: Session):
    result_list = []

    probs_by_category = get_probs_by_category(id, db)

    if probs_by_category :
        size = len(probs_by_category)

        index = random.sample(range(0, size + 1), 3)

        for i in index:
            result_list.append(probs_by_category[i])

    probs_by_rival = get_probs_by_rival(id, db)

    if probs_by_rival :
        size = len(probs_by_rival)

        index += random.sample(range(0, size + 1), 2)
        result_list.append(probs_by_rival[index[0]])
        result_list.append(probs_by_rival[index[1]])

    return result_list


