import datetime
import json

from requests import Session

from sql_app import models
from sql_app.schemas import Period, proCntPerDay


# 티어 상승 로드맵을 가져온다
def get_roadMap(userId: str, db: Session):
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
