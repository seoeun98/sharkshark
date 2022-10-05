from requests import Session

from sql_app import models
from copy import deepcopy

def divide(list: list):
    result_list = []
    divide_list = []
    i = 0
    cnt = 0

    for one in list:
        divide_list.append(one)
        i += 1
        cnt += 1

        if i == round(len(list)/4) or cnt == len(list):
            i = 0
            result_list.append(deepcopy(divide_list))
            divide_list.clear()

    return result_list

def get_aver_rank(list: list, db: Session):
    result_list = []

    for prob_list_one in list:
        total = 0
        for prob in prob_list_one:
            prob_rank = db.query(models.problem).filter(models.problem.no == prob['probNo']).first().__dict__['level']
            total += prob_rank
        result_list.append(round(total / len(prob_list_one), 1))

    return result_list

def tag_prob_cnt(list: list, db: Session):
    result_list = []

    tags_cnt = {"math": 0, "implementation": 0, "greedy": 0, "string": 0, "dataStructure": 0, "graph": 0, "dp": 0,"bruteforce": 0}
    for prob_list_one in list:
        for prob in prob_list_one:
            prob_tags = db.query(models.problem).filter(models.problem.no == prob['probNo']).first().__dict__['tags']
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
