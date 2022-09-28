import datetime
import json

from requests import Session
from sql_app.repository import rivalRepository
from sql_app import models
from sql_app.schemas import Period
from sql_app.service import roadMap


# 티어 상승 로드맵을 가져온다
def get_roadMap(userId: str, db: Session):
    user_list = db.query(models.solvedProblem).filter(models.solvedProblem.userId == userId).order_by(models.solvedProblem.solvedDate.desc()).all()

    result_list = []
    for one in user_list:
        result_list.append(one.__dict__)

    user_divided_list = roadMap.divide(result_list)
    user_aver_list = roadMap.get_aver_rank(user_divided_list, db)
    user_tags_cnt = roadMap.tag_prob_cnt(user_divided_list, db)

    first_aver = []
    first_tags = []
    rivals = rivalRepository.get_recommend_rivals_list(userId, db).__dict__['rivalIds'].split(',')

    for rival in rivals:
        rival_probs = db.query(models.solvedProblem).filter(models.solvedProblem.userId == rival).order_by(models.solvedProblem.solvedDate.desc()).all()
        rival_prob_list = []

        for one in rival_probs:
            rival_prob_list.append(one.__dict__)


        rival_divided_list = roadMap.divide(rival_prob_list)

        rival_aver_list = roadMap.get_aver_rank(rival_divided_list, db)
        print(rival_aver_list)
        print("test")
        rival_tags_cnt = roadMap.tag_prob_cnt(rival_divided_list, db)
        first_aver.append(rival_aver_list)
        first_tags.append(rival_tags_cnt)

    second_aver = [0, 0, 0, 0, 0]
    for first in first_aver:

        for i in range(0, 5):
            second_aver[i] += round(first[i]/5, 2)

    second_tags = {"math":0, "implementation":0, "greedy":0, "string":0, "dataStructure":0, "graph":0, "dp":0, "bruteforce":0 }

    for first in first_tags:
        second_tags["math"] += round(float(first["math"]/5), 1)
        second_tags["implementation"] += round(float(first["implementation"]/5), 1)
        second_tags["greedy"] += round(float(first["greedy"]/5), 1)
        second_tags["string"] += round(float(first["string"]/5), 1)
        second_tags["dataStructure"] += round(float(first["dataStructure"]/5), 1)
        second_tags["graph"] += round(float(first["graph"]/5), 1)
        second_tags["dp"] += round(float(first["dp"]/5), 1)
        second_tags["bruteforce"] += round(float(first["bruteforce"]/5), 1)


    return None;

# 주요 유형 조회. 유형별 능력치 표현
def get_major_category(userId: str, db: Session):
    return db.query(models.major_category).filter(models.major_category.userId == userId).first()

# 기간별 문제 풀이 조회
def get_period_problem(period: Period, userId: str, db: Session):
    list = {}

    for i in range(int(period.startDate.strftime('%Y%m%d')), int(period.endDate.strftime('%Y%m%d')) + 1):
        if i % 100 <= 31 and i % 1000 != 0 :
            cnt_per_day = db.query(models.solvedProblem).filter(models.solvedProblem.userId == userId).all()
            cnt = 0
            for test in cnt_per_day:
                if int(test.__dict__['solvedDate'].strftime('%Y%m%d')) == i:
                    cnt += 1
            list[i] = cnt

    return list;

# 주요 오답 유형 조회
def get_major_wrong(userId: str, db: Session):
    return db.query(models.wrongType).filter(models.wrongType.userId == userId).first()
