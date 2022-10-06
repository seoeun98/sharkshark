import requests, copy
from datetime import datetime
from bs4 import BeautifulSoup

format = '%Y-%m-%d %H:%M:%S'

class result:
    def __init__(self, solved, probNo, userInfo, time_sort_list: list, memory_sort_list: list):
        self.solved = solved
        self.probNo = probNo
        self.userInfo = userInfo
        self.time_sort_list = time_sort_list
        self.memory_sort_list = memory_sort_list

class user:
    def __init__(self, userId, memory, time, lang, timeStamp):
        self.userId = userId
        self.memory = memory
        self.time = time
        self.lang = lang
        self.timeStamp =timeStamp

class detail:
    def __init__(self, probNo: int, problem_description: str, input_description: str, output_description: str, in_list: list, out_list: list) -> None:
        self.probNo = probNo
        self.problem_description = problem_description
        self.input_description = input_description
        self.output_description = output_description
        self.in_list = in_list
        self.out_list = out_list
        pass


class solvedProblem:
      def __init__(self, userId, probNo, solvedDate):
          self.userId = userId
          self.probNo = probNo
          self.solvedDate = datetime.strptime(solvedDate, format)
          pass

# 채점현황 크롤링
def get_status_crawling(userId : str, probNo, langNum=-1, start='1900-01-01', page=1) -> list:
    url = f'https://www.acmicpc.net/status?problem_id={probNo}&user_id={userId}&language_id={langNum}&result_id=4&from_problem=1'
    headers = {'User-Agent': "Mediapartners-Google"}
    # 결과를 담을 배열
    statusRes = []
    for i in range(0, page):  
        response = requests.request("GET", url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        problems = soup.find_all('tr')

        # 페이지 내의 정보 리스트에 추가
        for i in range(1, len(problems)):
            if problems[i].select_one('td:nth-of-type(9) > a')['title'] < start:
                break;
            try:
                statusRes.append([problems[i].select_one('td:nth-of-type(2) > a').text, problems[i].select_one('td:nth-of-type(3) > a').text, int(problems[i].select_one('td:nth-of-type(5)').text), int(problems[i].select_one('td:nth-of-type(6)').text), problems[i].select_one('td:nth-of-type(7)').text, problems[i].select_one('td:nth-of-type(9) > a')['title']])
            except:            
                return statusRes

        # 다음 페이지
        try:
            url = 'https://www.acmicpc.net' + soup.find('a', {'id':'next_page'})['href']
        except: 
            return statusRes
    return statusRes

# 채점현황 크롤링 하여 최근 제출한 문제 최근 제출 유저들 결과 도출
def get_mockRes(userId : str, probNo, start):
    list = get_status_crawling(userId, probNo, -1, start)

    # 문제를 풀었을 경우
    if len(list) > 0:   
        is_solved = True     
        # user(userId, memory, time, lang, timeStamp)
        userInfo = user(list[0][0], list[0][2], list[0][3], list[0][4], list[0][5])
        lang = list[0][4]
    # 문제를 못 풀었을 경우
    else:
        is_solved = False
        # user(userId, memory, time, lang, timeStamp)
        userInfo = user(userId, 0, 0, '', '')
        lang = ''

    langNum = -1
    if "C++" in lang:
        langNum = 1001
    elif "Java" in lang:
        langNum = 1002
    elif "Python" in lang or "PyPy" in lang:
        langNum = 1003
    elif "C" in lang:
        langNum = 1004
    elif "Rust" in lang:
        langNum = 1005

    res_list = get_status_crawling('', probNo, langNum, '1900-01-01', 3)

    res = []
    for l in res_list:
        # user(userId, memory, time, lang, timeStamp)
        res.append(user(l[0], l[2], l[3], l[4], l[5]))

    time_sort_list = res
    memory_sort_list = copy.deepcopy(res)

    # 코드 실행 속도 순 정렬
    time_sort_list.sort(key=lambda x: (x.time, x.memory))
    
    # 메모리 크기 순 정렬
    memory_sort_list.sort(key=lambda x: (x.memory, x.time))
    

    res2 = result(is_solved, probNo, userInfo, time_sort_list, memory_sort_list)
    return res2


# 문제 상세내용 크롤링
def get_prob_detail(probNo : int):
  url = f'https://www.acmicpc.net/problem/{probNo}'

  response = requests.get(url)

  # 통신 상태 정상
  if response.status_code == 200:
      html = response.text
      soup = BeautifulSoup(html, 'html.parser')

      # 크롤링 내용 분류
      problem_description = soup.select('#problem_description')
      input_description = soup.select('#problem_input > p')
      output_description = soup.select('#problem_output > p')
      sample_input = soup.select_one('#sampleinput1').text.strip()
      sample_output = soup.select_one('#sampleoutput1').text.strip()
      sample_i = soup.select("pre[id^=sample-input]")
      sample_o = soup.select("pre[id^=sample-output]")

      # 문제 내용
      str_list = []      
      for i in problem_description:
          str_list.append(i.text.strip() + '\n\n')
      p_pd = ''.join(str_list)

      # 입력
      str_list = []
      for i in input_description:
          str_list.append(i.text.strip() + '\n\n')
      p_id = ''.join(str_list)

      # 출력
      str_list = []          
      for i in output_description:
          str_list.append(i.text.strip() + '\n\n')
      p_od = ''.join(str_list)

      # 예제
      in_list = []
      out_list = []
      for i in range(len(sample_i)):
          in_list.append(sample_i[i].text.strip())
          out_list.append(sample_o[i].text.strip())

      prob_detail = detail(probNo, p_pd, p_id, p_od, in_list, out_list)

      return prob_detail   

  # 통신이 제대로 이루어지지 않은 경우
  else:
      return None

def is_in_solvedac(userId : str):
    url = f'https://solved.ac/api/v3/user/show?handle={userId}'
    headers = { "Content-Type": "application/json" }
    response = requests.request("GET", url, headers=headers)

    if response.status_code == 404:
        return False
    else:        
        return True

# 최근 푼 문제 목록
def lately_solved_problem_seq_crawling(username : str) -> list:
    url = f'https://www.acmicpc.net/status?problem_id=&user_id={username}&language_id=-1&result_id=4'
    headers = {'User-Agent': "Mediapartners-Google"}

    lately_solved_problems = []

    for page in range(1, 4):      
      response = requests.request("GET", url, headers=headers)
      soup = BeautifulSoup(response.text, 'html.parser')
      problems = soup.find_all('tr')

      for i in range(1, len(problems)):
          try:
              lately_solved_problems.append(solvedProblem(username, problems[i].select_one('td:nth-of-type(3) > a').text, problems[i].select_one('td:nth-of-type(9) > a')['title']))
          except:
              return lately_solved_problems
      try:
          url = 'https://www.acmicpc.net' + soup.find('a', {'id':'next_page'})['href']
      except: 
          return lately_solved_problems      

    return lately_solved_problems
