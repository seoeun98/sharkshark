from datetime import datetime

import numpy as np

from requests import Session
from sql_app.repository import rivalRepository
from sql_app import models
from sql_app.service import roadMap

def get_probs_order_by_recent_solved(id: str, db: Session):
    return db.query(models.solvedProblem).filter(models.solvedProblem.userId == id)\
        .order_by(models.solvedProblem.solvedDate.desc()).all()

# 티어 상승 로드맵을 가져온다
def get_roadMap(userId: str, db: Session):
    user_list_a = get_probs_order_by_recent_solved(userId, db)
    user_list = []
    result_list = []
    for one in user_list_a:
        result_list.append(one.__dict__)

    user_divided_list = roadMap.divide(result_list)
    user_aver_list = roadMap.get_aver_rank(user_divided_list, db)
    user_tags_cnt = roadMap.tag_prob_cnt(user_divided_list, db)

    user_list.append(user_aver_list)
    user_list.append(user_tags_cnt[0])

    rival_list = []
    first_aver = []
    first_tags = []
    rivals = rivalRepository.get_recommend_rivals_list(userId, db)

    for rival in rivals:
        rival_probs = get_probs_order_by_recent_solved(rival.userId, db)
        rival_prob_list = []

        for one in rival_probs:
            rival_prob_list.append(one.__dict__)

        rival_divided_list = roadMap.divide(rival_prob_list)
        rival_aver_list = roadMap.get_aver_rank(rival_divided_list, db)
        rival_tags_cnt = roadMap.tag_prob_cnt(rival_divided_list, db)
        first_aver.append(rival_aver_list)
        first_tags.append(rival_tags_cnt)

    second_aver = roadMap.get_probs_aver(first_aver)
    second_tags = roadMap.get_probs_tag(first_tags)

    rival_list.append(second_aver)
    rival_list.append(second_tags)

    result = []
    result.append(user_list)
    result.append(rival_list)

    return result;

# 주요 유형 조회. 유형별 능력치 표현
def get_major_category(userId: str, db: Session):
    return db.query(models.major_category).filter(models.major_category.userId == userId).first()

# 추천 유저들의 주요 유형 평균
def get_major_category_avg(userId: str, db: Session):
    rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == userId).first().__dict__        
    rec_rival_list = rec_rivals['rivalIds'].split(',')

    rec_rival_major_category_list = db.query(models.major_category).filter(models.major_category.userId.in_(rec_rival_list)).all()

    return roadMap.get_recommend_users_major_cate_avg(rec_rival_major_category_list)

# 기간별 문제 풀이 조회
def get_period_problem(userId: str, db: Session):
    cnt_per_day = get_probs_order_by_recent_solved(userId, db)

    last_day = int(cnt_per_day[0].__dict__['solvedDate'].strftime('%Y%m%d'))
    first_day = int(cnt_per_day[-1].__dict__['solvedDate'].strftime('%Y%m%d'))

    return roadMap.get_period_problem_cnt(first_day, last_day, cnt_per_day)

# 주요 오답 유형 조회
def get_major_wrong(userId: str, db: Session):
    return db.query(models.wrongType).filter(models.wrongType.userId == userId).first()

# 추천 유저들의 최근 푼 문제 레벨 평균
def get_level_avg(userId: str, db: Session):
    # 라이벌 조회
    rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == userId).first().__dict__
    rec_rival_list = rec_rivals['rivalIds'].split(',')

    solved_pb_list = db.query(models.solvedProblem).filter(models.solvedProblem.userId.in_(rec_rival_list)).all()

    pb_no_list = []
    for one in solved_pb_list:
        pb_no_list.append(one.probNo)

    pb_no_set = set(pb_no_list)

    pb_list = db.query(models.problem.no, models.problem.title, models.problem.level).filter(models.problem.no.in_(pb_no_set)).all()
    
    pb_lv_list = []
    for one in pb_list:
        pb_lv_list.append(one.level)    

    lv_avg = np.mean(pb_lv_list)

    return pb_list, lv_avg

# 추천 유저들의 최근 주간 평균 푼 문제 수
def get_pb_per_week(userId: str, db: Session):
    # 라이벌 조회
    rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == userId).first().__dict__
    rec_rival_list = rec_rivals['rivalIds'].split(',')

    res_list = []
    for one in rec_rival_list:
        rival_probs = db.query(models.solvedProblem).filter(models.solvedProblem.userId == one).order_by(models.solvedProblem.solvedDate).all()
        recent_date = datetime.strptime(str(rival_probs[-1].solvedDate), "%Y-%m-%d %H:%M:%S").date()
        last_date = datetime.strptime(str(rival_probs[0].solvedDate), "%Y-%m-%d %H:%M:%S").date() 
        res_list.append({"userId" : one, "pb_per_week" : 7 * len(rival_probs) / (abs((recent_date - last_date).days) + 1)})

    return res_list