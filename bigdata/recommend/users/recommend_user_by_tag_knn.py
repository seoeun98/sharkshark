## 유저의 tag 별 푼 문제의 난이도 평균 계산
import pandas as pd
from tqdm import tqdm
import numpy as np
import os
import json
from sklearn.neighbors import NearestNeighbors
import warnings

file_path = '../../data/'
# file_path = 'data/'


def remove_self(x):
    if x[0] in x[1]:
        return np.delete(x[1],np.where(x[0]==x[1])[0])
    else:
        return x[1][:6]

def get_user_avg_level_of_each_tag():
    df_problems = pd.read_csv(file_path + 'probleams.csv')  # 문제 데이터
    df_problems_solved = pd.read_csv(file_path + 'user_solved_problems_221002_drop.csv')  # 유저별 푼 문제 데이터

    df = pd.DataFrame(columns = ['handle', 'math', 'implementation', 'greedy', 'string', 'data_structures', 'graphs', 'dp', 'bruteforcing', 'math_cnt', 'implementation_cnt', 'greedy_cnt', 'string_cnt', 'data_structures_cnt', 'graphs_cnt', 'dp_cnt', 'bruteforcing_cnt'])
    tag_list = ['math', 'implementation', 'greedy', 'string', 'data_structures', 'graphs', 'dp', 'bruteforcing']

    idx = 0
    df_user_problems = df_problems_solved.dropna()[['handle', 'problems']]
    df_problems = df_problems.dropna()
    for row in tqdm(df_user_problems.itertuples()):
        # 유저 아이디
        handle = row[1]
        # 문제 번호 목록
        problems = row[2].split(',')
        df.loc[idx] = [handle, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        # 문제 번호마다 태그 체크
        for problem in problems:
            if problem == '': 
                continue
            info = df_problems[df_problems['problem_id'] == int(problem)]
            if info.empty:
                continue
            tags = info.iloc[0]['tags'].split(',')
            # 주요 태그 일치 여부 확인
            for tag in tag_list:            
                if tag in tags:
                    # tag 별 문제 난이도 합
                    df.loc[idx, tag] += info.iloc[0]['level']
                    # tag 별 문제 총 갯수
                    df.loc[idx, tag + '_cnt'] += 1 
        idx = idx + 1

    # 평균 계산
    df = cal_avg(df)

    # csv 로 저장
    df.to_csv(file_path + 'user_avg_level_of_tags_221002.csv')

    return df

def cal_avg(df):
    # 사용할 태그
    tag_list = ['math', 'implementation', 'greedy', 'string', 'data_structures', 'graphs', 'dp', 'bruteforcing']

    # 평균 계산 
    for tag in tag_list:            
        df[tag] = df[tag] / df[tag + '_cnt']

    # 전처리 및 필요없는 컬럼 제거
    df = df.fillna(0)
    df = df.drop(df.columns[9:], axis=1)
    df = df.round(3)

    return df

def rival_tag_knn_main():
    # df_problems, df_problems_solved, df_users = load_data()
    # print('데이터 로드 완료!')
    # df_data= preprocess_rival(df_problems_solved,df_problems,df_users)
    # print('데이터 전처리 완료!')
    # df_data = get_user_avg_level_of_each_tag()
    df_data = pd.read_csv(file_path + 'user_avg_level_of_tags_221002.csv')  # 문제 데이터
    print(df_data)

    knn = NearestNeighbors(n_neighbors=7, p=1)
    data= np.array(df_data.iloc[:,2:])
    knn.fit(data)
    rival_idx= knn.kneighbors(data, return_distance=False)
    print('knn 학습 수행 완료!')
    result=([[k,v] for k,v in zip(list(range(len(rival_idx))),rival_idx)])
    df_result= pd.DataFrame(result)
    df_result[1]= df_result.apply(remove_self, axis=1)
    df_result= df_result[1]
    lst_rivals= [','.join(list(df_data['handle'].iloc[x].values)) for x in df_result]
    target_users= list(df_data.handle)

    output = pd.DataFrame(target_users, columns=['handle'])
    output['rec_rivals'] = lst_rivals
    output.index += 1  #mysql에서 auto increment를 위해 1 추가
    output.index.name='id'
    output.to_csv(file_path + 'rivals_tag_knn_221002.csv')

    print('라이벌 추천 완료!')
    return output


# df = get_user_avg_level_of_each_tag()
# df = pd.read_csv(file_path + 'user_avg_level_of_tags.csv')  # 태그 레벨 합 및 문제 수
# df = df.drop(df.columns[:2], axis=1)
# df = cal_avg(df)
# print(df)
# df.to_csv(file_path + 'user_avg_level_of_tags_.csv')
rival_tag_knn_main()