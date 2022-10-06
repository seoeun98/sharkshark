from requests import Session
from datetime import datetime 

from sql_app import models
from copy import deepcopy

class major_category_avg:
    def __init__(self, userId="", math=0, implementation=0, greedy=0, string=0, dataStructure=0, graph=0, dp=0, bruteforce=0):
        self.userId = userId
        self.math = math
        self.implementation = implementation
        self.greedy = greedy
        self.string = string
        self.dataStructure = dataStructure
        self.graph = graph
        self.dp = dp
        self.bruteforce = bruteforce
        pass

def divide(list: list):
    result_list = []
    divider = len(list) // 10

    start = 0
    for i in range(10):
        result_list.append(list[start:start + divider])
        start += divider

    result_list[9] += list[start:]
    return result_list

def get_aver_rank(list: list, db: Session):
    result_list = []

    for prob_list_one in list:
        total = 0
        for prob in prob_list_one:
            prob_rank = db.query(models.problem).filter(models.problem.no == prob['probNo']).first()
            try:
                prob_rank = prob_rank.__dict__['level']
                pass
            except Exception as e:
                continue                
            total += prob_rank
        result_list.append(round(total / len(prob_list_one), 1))

    return result_list

def tag_prob_cnt(list: list, db: Session):
    result_list = []

    tags_cnt = {"math": 0, "implementation": 0, "greedy": 0, "string": 0, "dataStructure": 0, "graph": 0, "dp": 0,"bruteforce": 0}
    for prob_list_one in list:
        for prob in prob_list_one:
            try:
                prob_tags = db.query(models.problem).filter(models.problem.no == prob['probNo']).first().__dict__['tags']
                pass
            except Exception as e:
                continue
            if prob_tags != None:
                if "math" in prob_tags:
                    tags_cnt["math"] += 1
                if "implementation" in prob_tags:
                    tags_cnt["implementation"] += 1
                if "greedy" in prob_tags:
                    tags_cnt["greedy"] += 1
                if "string" in prob_tags:
                    tags_cnt["string"] += 1
                if "dataStructure" in prob_tags:
                    tags_cnt["dataStructure"] += 1
                if "graph" in prob_tags:
                    tags_cnt["graph"] += 1
                if "dp" in prob_tags:
                    tags_cnt["dp"] += 1
                if "bruteforce" in prob_tags:
                    tags_cnt["bruteforce"] += 1

    result_list.append(deepcopy(tags_cnt))
    return result_list


def get_probs_aver(first_aver: list):
    second_aver = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for first in first_aver:
        while len(first) < 10:
            first.append(0)

        for i in range(0, 10):
            second_aver[i] += first[i] / 6
        for i in range(0, 10):
            second_aver[i] = round(second_aver[i], 1)

    return second_aver;

def get_probs_tag(first_tags: list):
    second_tags = {"math":0, "implementation":0, "greedy":0, "string":0, "dataStructure":0, "graph":0, "dp":0, "bruteforce":0 }

    for list in first_tags:
        first = list.pop()

        second_tags['math'] += round(first['math']/6)
        second_tags['implementation'] += round(first['implementation']/6)
        second_tags['greedy'] += round(first['greedy']/6)
        second_tags['string'] += round(first['string']/6)
        second_tags['dataStructure'] += round(first['dataStructure']/6)
        second_tags['graph'] += round(first['graph']/6)
        second_tags['dp'] += round(first['dp']/6)
        second_tags['bruteforce'] += round(first['bruteforce']/6)

    return second_tags

def get_period_problem_cnt(first_day: int, last_day: int, cnt_per_day: list):
    list = {}

    day = 31
    for i in range(first_day, last_day + 1):
        if (i % 100 == 1 or i == last_day) and i % 10000 <= 1231:
            month = i
            for k in range(0, 2):
                month = month // 10
            month = month % 100

            if month == 2:
                day = 29
            elif month in (4, 6, 9, 11):
                day = 30
            else:
                day = 31

        if i % 100 <= day and i % 1000 != 0 and i % 10000 <= 1231 and i % 10000 >= 101 and i % 100 != 0:
            cnt = 0
            for test in cnt_per_day:
                if int(test.__dict__['solvedDate'].strftime('%Y%m%d')) == i:
                    cnt += 1
            
            date = str(i)
            list[date[:4] + '-' + date[4:6] + '-' + date[6:8]] = cnt
    return list

def get_recommend_users_major_cate_avg(list: list):
    res = major_category_avg()

    for one in list:
        res.userId += one.userId + ','
        res.math += one.math
        res.implementation += one.implementation
        res.greedy += one.greedy
        res.string += one.string
        res.dataStructure += one.dataStructure
        res.graph += one.graph
        res.dp += one.dp
        res.bruteforce += one.bruteforce

    size = len(list)
    res.userId = res.userId[:-1]

    math = res.math / size
    implementation = res.implementation / size
    greedy = res.greedy / size
    string = res.string / size
    dataStructure = res.dataStructure / size
    graph = res.graph / size
    dp = res.dp / size
    bruteforce = res.bruteforce / size

    res.math = round(math, 1)
    res.implementation = round(implementation, 1)
    res.greedy = round(greedy, 1)
    res.string = round(string, 1)
    res.dataStructure = round(dataStructure, 1)
    res.graph = round(graph, 1)
    res.dp = round(dp, 1)
    res.bruteforce = round(bruteforce, 1)
    return res