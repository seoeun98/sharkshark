from sql_app import models
from sql_app.database import engine
import pandas as pd

from recommend.users import recommend_user_by_tag_knn

models.Base.metadata.create_all(engine)

columns = ['userId', 'math', 'implementation', 'greedy', 'string', 'dataStructure', 'graph', 'dp', 'bruteforce', 'no']

df = recommend_user_by_tag_knn.df
df['no'] = range(1, len(df) + 1)
df.columns = columns
df = pd.DataFrame(df, columns=columns)
# df['no'] = df['no'] + 1
# df = df.head(1)
df = df.drop_duplicates(['userId'])


# conn = engine.connect()

# df = pd.DataFrame({ 'no' : [1],
# 					'userId' : ['turtlebooster'],
# 					'math' : [0.0],
# 					'implementation' : [0.0],
# 					'greedy': [0.0],
# 					'string': [0.0],
# 					'dataStructure': [0.0],
# 					'graph' : [0.0],
# 					'dp' : [0.0],
# 					'bruteforce' : [0.0]})

print(df)

df.to_sql(name='major_category', con=engine, if_exists='append', index=False)

# conn.close()