from sql_app import models
from sql_app.database import engine
import pandas as pd

# from recommend.users import recommend_user_by_tag_knn

# DB 테이블 생성
models.Base.metadata.create_all(engine)

# csv 데이터 폴더 위치
file_path = 'data/'

# major_category 테이블 입력
def data_into_major_category():	
	# major_category 에 사용될 columns
	columns = ['userId', 'math', 'implementation', 'greedy', 'string', 'dataStructure', 'graph', 'dp', 'bruteforce', 'no']

	# csv 파일 읽어오기 (데이터 프레임으로)
	df = pd.read_csv(file_path + 'user_avg_level_of_tags_.csv', index_col=0)

	# column 명 db에 맞게 변환
	df.columns = columns
	# df = pd.DataFrame(df, columns=columns)

	# userId 중복 제거
	df = df.drop_duplicates(['userId'])

	# no column 추가
	df['no'] = range(1, len(df) + 1)

	# db에 데이터 입력
	df.to_sql(name='major_category', con=engine, if_exists='append', index=False)

# bj_user 테이블 입력
def data_into_bj_user():	
	# bj_user 에 사용될 columns	
	bj_users_columns = ['userId', 'solvedCount', 'userClass', 'tier', 'rating', 'ratingByProblemsSum', 'ratingByClass', 'ratingBySolvedCount', 'exp', 'rivalCount', 'reverseRivalCount', 'maxStreak', 'rank', 'organization']
	solved_problems_columns = ['userId', 'problems']

	# csv 파일 읽어오기 (데이터 프레임으로)
	df_bj_users = pd.read_csv(file_path + 'users.csv', index_col=0)
	df_solved_problems = pd.read_csv(file_path + 'user_solved_problems.csv')

	# column 명 db에 맞게 변환
	df_bj_users.columns = bj_users_columns	
	df_solved_problems.columns = solved_problems_columns


	# userId 중복 제거
	df_bj_users = df_bj_users.drop_duplicates(['userId'])
	df_solved_problems = df_solved_problems.drop_duplicates(['userId'])

	# 데이터프레임 합치기
	df_bj_users = pd.merge(df_bj_users, df_solved_problems, how='inner',on='userId')

	# no column 추가
	df_bj_users['no'] = range(1, len(df_bj_users) + 1)


	# db에 데이터 입력
	df_bj_users.to_sql(name='bj_user', con=engine, if_exists='append', index=False)


# solvedproblem 테이블 입력
def data_into_solvedproblem():	
	# solvedproblem 에 사용될 columns	
	lately_solvedproblem_columns = ['userId', 'probNo', 'solvedDate']

	# csv 파일 읽어오기 (데이터 프레임으로)
	df_lately_solvedproblem = pd.read_csv(file_path + 'user_lately_solved_problems.csv')
	# print(df_lately_solvedproblem)
	# column 명 db에 맞게 변환
	df_lately_solvedproblem.columns = lately_solvedproblem_columns	

	print(df_lately_solvedproblem)

	# db에 데이터 입력
	df_lately_solvedproblem.to_sql(name='solvedproblem', con=engine, if_exists='append', index=False)

# worngtype 테이블 입력
def data_into_wrongtype():	

	df_lately_worngproblem = pd.read_csv(file_path + 'wrong_pb.csv')
	df_lately_worngproblem.loc[df_lately_worngproblem['result'].str.contains('런타임 에러'), 'result'] = '런타임 에러'
	# worngtype = ['handle', '출력 형식이 잘못되었습니다', '틀렸습니다', '시간 초과', '메모리 초과', '출력 초과', '런타임 에러', '컴파일 에러']
	worngtype_columns = ['no', 'userId', 'problems', 'typeName', 'timestamp']
	df_lately_worngproblem.columns = worngtype_columns
	print(df_lately_worngproblem)
	series = df_lately_worngproblem.groupby('userId')['typeName'].value_counts()
	df_wrongtype = series.reset_index(name='wrongCnt')
	print(df_wrongtype)
	df_wrongtype.to_sql(name='wrongtype', con=engine, if_exists='append', index=False)
	# # wrongtype 에 사용될 columns	
	# wrongtype_columns = ['typeName', 'userId', 'wrongCnt']

	# # csv 파일 읽어오기 (데이터 프레임으로)
	# df_lately_solvedproblem = pd.read_csv(file_path + 'user_lately_solved_problems.csv')
	# # print(df_lately_solvedproblem)
	# # column 명 db에 맞게 변환
	# df_lately_solvedproblem.columns = lately_solvedproblem_columns	

	# print(df_lately_solvedproblem)

	# # db에 데이터 입력
	# df_lately_solvedproblem.to_sql(name='solvedproblem', con=engine, if_exists='append', index=False)


# db 연결
conn = engine.connect()

# major_category 테이블 입력
# data_into_major_category()

# bj_user 테이블 입력
# data_into_bj_user()

# solvedproblem 테이블 입력
# data_into_solvedproblem()

data_into_wrongtype()

conn.close()