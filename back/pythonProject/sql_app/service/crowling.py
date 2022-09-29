import requests
from bs4 import BeautifulSoup

class result:
    def __init__(self, solved, list: str):
        self.solved = solved
        self.list = list
class user:
    def __init__(self, userId, probNo, meory, time, lang, timeStamp):
        self.userId = userId
        self.probNo = probNo
        self.meory = meory
        self.time = time
        self.lang = lang
        self.timeStamp =timeStamp

# 채점현황 크롤링
def get_status_crawling(userId : str, probNo, langNum=-1, start='1900-01-01') -> list:
    url = f'https://www.acmicpc.net/status?problem_id={probNo}&user_id={userId}&language_id={langNum}&result_id=4&from_problem=1'
    headers = {'User-Agent': "Mediapartners-Google"}
    # 결과를 담을 배열
    statusRes = []
  
    response = requests.request("GET", url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    problems = soup.find_all('tr')

    for i in range(1, len(problems)):
        if problems[i].select_one('td:nth-of-type(9) > a')['title'] < start:
            break;
        try:
            statusRes.append([problems[i].select_one('td:nth-of-type(2) > a').text, problems[i].select_one('td:nth-of-type(3) > a').text, int(problems[i].select_one('td:nth-of-type(5)').text), int(problems[i].select_one('td:nth-of-type(6)').text), problems[i].select_one('td:nth-of-type(7)').text, problems[i].select_one('td:nth-of-type(9) > a')['title']])
        except:            
            return statusRes
    return statusRes

# 채점현황 크롤링 하여 최근 제출한 문제 최근 제출 유저들 결과 도출
def get_mockRes(userId : str, probNo, start):
    list = get_status_crawling(userId, probNo, -1, start)
    
    # 문제를 풀었을 경우
    if len(list) > 0:        
        lang = list[0][4]
        langNum = -1
        if "C++" in lang:
            langNum = 1001
        elif "Java" in lang:
            langNum = 1002
        elif "Python" in lang | "PyPy" in lang:
            langNum = 1003
        elif "C" in lang:
            langNum = 1004
        elif "Rust" in lang:
            langNum = 1005

        list2 = get_status_crawling('', '1987', langNum)
        # 코드 실행 속도 순, 같으면 메모리 낮은 순 정렬
        list2.sort(key=lambda x: (x[3], x[2]))   

        res = []
        for l in list2[0:5]:
            # user(userId, probNo, meory, time, lang, timeStamp)
            res.append(user(l[0], l[1], l[2], l[3], l[4], l[5]))

        res2 = result(True, res)
        return res2

    # 문제를 못 풀었을 경우
    else:
        res2 = result(False, "")
        return res2