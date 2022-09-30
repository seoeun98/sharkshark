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

class detail:
    def __init__(self, probNo: int, problem_description: str, input_description: str, output_description: str, example: str) -> None:
        self.probNo = probNo
        self.problem_description = problem_description
        self.input_description = input_description
        self.output_description = output_description
        self.example = example
        pass

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
      str_list.append("#####   Problem " + str(probNo) + "  ######\n")
      for i in problem_description:
          str_list.append(i.text.strip() + '\n\n')
      p_pd = ''.join(str_list)

      # 입력
      str_list = []
      str_list.append("IN\n")
      for i in input_description:
          str_list.append(i.text.strip() + '\n\n')
          # print(i.text.strip(), end = '\n\n')
      p_id = ''.join(str_list)

      # 출력
      str_list = []          
      str_list.append("OUT\n")
      # print("OUT")
      for i in output_description:
          str_list.append(i.text.strip() + '\n\n')
          # print(i.text.strip(), end = '\n\n')
      p_od = ''.join(str_list)

      # 예제
      str_list = []
      str_list.append("EXAMPLE\n")
      # print("EXAMPLE")
      for i in range(len(sample_i)):
          str_list.append("### IN" + str(i+1) + ' ###\n')
          # print("### IN", i+1, '###')
          str_list.append(sample_i[i].text.strip() + '\n\n')
          # print(sample_i[i].text.strip(), end='\n\n')
          str_list.append("### OUT" + str(i+1) + ' ###\n')
          # print("### OUT", i+1, '###')
          str_list.append(sample_o[i].text.strip() + '\n\n')
          # print(sample_o[i].text.strip(), end='\n\n')
      p_e = ''.join(str_list)

      prob_detail = detail(probNo, p_pd, p_id, p_od, p_e)

      return prob_detail   

  # 통신이 제대로 이루어지지 않은 경우
  else:
      return None