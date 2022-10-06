from sql_app.repository import dataRepository
from sqlalchemy.orm import Session
from sql_app import models, schemas
import random

# def probs_filter(id: str, prob_list: List , db: Session):
#     db_user_probs_list = db.query(models.solvedProblem).filter(models.solvedProblem.userId == id).all()
#     result_list = []
#
#     for prob_one in prob_list:
#         if not prob_one in db_user_probs_list:
#             result_list.append(prob_one)
#
#     return result_list

def get_probs_by_rival(id: str, db: Session):
    prob_list = db.query(models.rec_problems).filter(models.rec_problems.userId == id).first().problems.split(',')
    # prob_list = probs_filter(id, prob_list, db)
    result_list = []

    if prob_list:
        for prob_no in prob_list :
            prob = db.query(models.problem).filter(models.problem.no == int(prob_no)).first()
            result_list.append(prob)

    return result_list

def get_probs_by_category(id: str, db: Session):
    prob_list = db.query(models.rec_problems_tag).filter(models.rec_problems_tag.userId == id).first().problems.split(',')
    # prob_list = probs_filter(id, prob_list, db)
    result_list = []

    for prob_no in prob_list:
        prob = db.query(models.problem).filter(models.problem.no == int(prob_no)).first()
        result_list.append(prob)

    return result_list

def get_probs_for_mock(id: str, db: Session):
    result_list = []

    if id == 'webb':
        prob1 = db.query(models.problem).filter(models.problem.no == 1000).first()
        prob2 = db.query(models.problem).filter(models.problem.no == 1001).first()
        prob3 = db.query(models.problem).filter(models.problem.no == 1002).first()
        prob4 = db.query(models.problem).filter(models.problem.no == 1003).first()
        prob5 = db.query(models.problem).filter(models.problem.no == 1004).first()
        result_list.append(prob1)
        result_list.append(prob2)
        result_list.append(prob3)
        result_list.append(prob4)
        result_list.append(prob5)

        return result_list

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

def get_recent_5_probs(prob_list: list, db: Session):    
    result_list = []

    for i in range(0, 5):
        prob_num = prob_list[i][1]        
        prob = db.query(models.problem).filter(models.problem.no == prob_num).first()
        result_list.append(prob)

    return result_list;

def get_probs_by_tag(userId: str, tag: str, db: Session):
    result_list = []
    user_tier = db.query(models.BJ_user).filter(models.BJ_user.userId == userId).first().tier

    list = db.query(models.problem).filter(models.problem.tags.like("%{}%".format(tag))).filter(models.problem.level.between(user_tier - 3, user_tier + 3)).order_by(models.problem.acceptedUserCnt.desc()).limit(20)

    for one in list:
        result_list.append(one.__dict__)

    return result_list

