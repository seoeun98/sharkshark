## 유저의 tag 별 푼 문제의 난이도 평균 계산
import pandas as pd
from tqdm import tqdm

file_path = '../../data/'

def get_user_avg_level_of_each_tag():
    df_problems = pd.read_csv(file_path + 'probleams.csv')  # 문제 데이터
    df_problems_solved = pd.read_csv(file_path + 'user_solved_problems.csv')  # 유저별 푼 문제 데이터

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
    for tag in tag_list:            
        df[tag] = df[tag] / df[tag + '_cnt']

    # 전처리 및 필요없는 컬럼 제거
    df = df.fillna(0)
    df = df.drop(df.columns[9:], axis=1)
    df = df.round(3)

    # csv 로 저장
    df.to_csv(file_path + 'user_avg_level_of_tags_.csv')

    return df