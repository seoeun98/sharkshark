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

def get_mockRes_crawling(username : str, probNo, langNum=-1, start='1900-01-01') -> list:
    url = f'https://www.acmicpc.net/status?problem_id={probNo}&user_id={username}&language_id={langNum}&result_id=4&from_problem=1'
    headers = {'User-Agent': "Mediapartners-Google"}
    # 결과를 담을 배열
    mockRes = []
  
    response = requests.request("GET", url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    problems = soup.find_all('tr')

    for i in range(1, len(problems)):
        if problems[i].select_one('td:nth-of-type(9) > a')['title'] < start:
            break;
        try:
            mockRes.append([problems[i].select_one('td:nth-of-type(2) > a').text, problems[i].select_one('td:nth-of-type(3) > a').text, int(problems[i].select_one('td:nth-of-type(5)').text), int(problems[i].select_one('td:nth-of-type(6)').text), problems[i].select_one('td:nth-of-type(7)').text, problems[i].select_one('td:nth-of-type(9) > a')['title']])
        except:
            mockRes.sort(key=lambda x: (x[3], x[2]))
            return mockRes
    # 코드 실행 속도 순, 같으면 메모리 낮은 순 정렬
    mockRes.sort(key=lambda x: (x[3], x[2]))    
    return mockRes

def get_mockRes(userId : str, probNo, start):
    list = get_mockRes_crawling(userId, probNo, -1, start)

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

        list2 = get_mockRes_crawling('', '1987', langNum)
        res = []
        for l in list2[0:5]:
            res.append(user(l[0], l[1], l[2], l[3], l[4], l[5]))

        res2 = result(True, res)
        return res2
    else:
        res2 = result(False, "")
        return res2