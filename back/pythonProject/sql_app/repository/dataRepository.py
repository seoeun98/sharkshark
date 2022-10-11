from datetime import datetime

import numpy as np
import math, json

from requests import Session
from sql_app.repository import rivalRepository, userRepository
from sql_app import models
from sql_app.service import roadMap, crowling

def get_probs_order_by_recent_solved(id: str, db: Session):    
    # return db.query(models.solvedProblem).filter(models.solvedProblem.userId == id)\
    #     .order_by(models.solvedProblem.solvedDate.desc()).all()
    return crowling.lately_solved_problem_seq_crawling(id)

# 티어 상승 로드맵을 가져온다
def get_roadMap(userId: str, db: Session):
    exist = False
    now  = datetime.now()
    latest_roadmap = db.query(models.roadmap).filter(models.roadmap.userId == userId).first()
    if latest_roadmap:
        exist = True
        date_diff = now - latest_roadmap.time
        # 업데이트 된지 1시간 이내라면
        if date_diff.seconds / 3600 <= 24:
            return json.loads(latest_roadmap.roadmap)


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

    json_result = json.dumps(result)
    # 테이블에 있었는지 유무 확인
    if exist:        
        # 업데이트        
        latest_roadmap.roadmap = json_result
        latest_roadmap.time = now
    else:
        # 추가
        db.add(models.roadmap(userId=userId, roadmap=json_result, time=now))
    db.commit()

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
    exist = False
    now  = datetime.now()
    latest_levelavg = db.query(models.levelavg).filter(models.levelavg.userId == userId).first()
    if latest_levelavg:
        exist = True
        date_diff = now - latest_levelavg.time
        # 업데이트 된지 1시간 이내라면
        if date_diff.seconds / 3600 <= 24:
            return json.loads(latest_levelavg.pb_list), latest_levelavg.lv_avg           

    # 라이벌 조회
    rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == userId).first().__dict__
    rec_rival_list = rec_rivals['rivalIds'].split(',')

    # solved_pb_list = db.query(models.solvedProblem).filter(models.solvedProblem.userId.in_(rec_rival_list)).all()
    solved_pb_list = []
    for one in rec_rival_list:
        solved_pb_list += crowling.lately_solved_problem_seq_crawling(one)

    pb_no_list = []
    for one in solved_pb_list:
        pb_no_list.append(one.probNo)

    pb_no_set = set(pb_no_list)
    
    pb_list = db.query(models.problem.no, models.problem.title, models.problem.level).filter(models.problem.no.in_(pb_no_set)).all()
    
    pb_lv_list = []
    for one in pb_list:
        pb_lv_list.append(one.level)    

    lv_avg = round(np.mean(pb_lv_list), 1)

    
    list_of_dicts = [{'no': row.no, 'title' : row.title, 'level' : row.level} for row in pb_list]
    json_pb_list = json.dumps(list_of_dicts)    
    # 테이블에 있었는지 유무 확인
    if exist:        
        # 업데이트        
        latest_levelavg.lv_avg = lv_avg
        latest_levelavg.pb_list = json_pb_list
        latest_levelavg.time = now
    else:
        # 추가
        db.add(models.levelavg(userId=userId, lv_avg=lv_avg, pb_list=json_pb_list, time=now))
    db.commit()

    return pb_list, lv_avg

# 추천 유저들의 최근 주간 평균 푼 문제 수
def get_pb_per_week(userId: str, db: Session):
    exist = False
    now  = datetime.now()
    latest_pbperweek = db.query(models.pbperweek).filter(models.pbperweek.userId == userId).first()
    if latest_pbperweek:
        exist = True
        date_diff = now - latest_pbperweek.time
        # 업데이트 된지 1시간 이내라면
        if date_diff.seconds / 3600 <= 24:
            return json.loads(latest_pbperweek.pbperweek)   

    # 라이벌 조회
    rec_rivals = db.query(models.rec_rival).filter(models.rec_rival.userId == userId).first().__dict__
    rec_rival_list = rec_rivals['rivalIds'].split(',')

    res_list = []
    for one in rec_rival_list:
        # rival_probs = db.query(models.solvedProblem).filter(models.solvedProblem.userId == one).order_by(models.solvedProblem.solvedDate).all()
        level = userRepository.get_bjuser_by_id(one, db).tier
        rival_probs = crowling.lately_solved_problem_seq_crawling(one)
        recent_date = datetime.strptime(str(rival_probs[-1].solvedDate), "%Y-%m-%d %H:%M:%S").date()
        last_date = datetime.strptime(str(rival_probs[0].solvedDate), "%Y-%m-%d %H:%M:%S").date() 
        res_list.append({"userId" : one, "pb_per_week" : round(7 * len(rival_probs) / (abs((recent_date - last_date).days) + 1), 2), "level" : level})

    json_result = json.dumps(res_list)
    # 테이블에 있었는지 유무 확인
    if exist:        
        # 업데이트        
        latest_pbperweek.pbperweek = json_result
        latest_pbperweek.time = now
    else:
        # 추가
        db.add(models.pbperweek(userId=userId, pbperweek=json_result, time=now))
    db.commit()    

    return res_list