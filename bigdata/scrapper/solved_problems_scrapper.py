import time
import json
import csv
import http.client
import pandas as pd
import requests
from bs4 import BeautifulSoup

# file_path = '/content/drive/MyDrive/SSAFY/'
file_path = '../data/'
headers = {'User-Agent': "Mediapartners-Google"}

class ProblemsSolved():
    def __repr__(self):
        return f"problems_solved('{self.id}', {self.handle}', '{self.problems}')"

def lately_solved_problem_seq_crawling(username : str) -> list:
    url = f'https://www.acmicpc.net/status?problem_id=&user_id={username}&language_id=-1&result_id=4'
    
    response = requests.request("GET", url, headers=headers)
    
    soup = BeautifulSoup(response.text, 'html.parser')
    user_seq = [problem.text for problem in soup.select('td:nth-of-type(3) > a')]
    print(user_seq)
    if user_seq:
        # 중복 seq 제거
        user_seq = sorted(set(user_seq), key = lambda x: user_seq.index(x))

    # 빈 리스드면 최근 문제가 존재하지 않는 유저
    return user_seq

def total_solved_problem_seq_crawling(username : str) -> list:
    url = f'https://www.acmicpc.net/user/{username}'

    response = requests.request("GET", url, headers=headers)
    
    if response.status_code == 404: user_seq = 'Not-Found-User'
    else:
        soup = BeautifulSoup(response.text, 'html.parser')
        user_seq = soup.find('div', {'class':'problem-list'}).text.split()

    # 빈 리스드면 지금 까지 맞은 문제가 존재하지 않는 유저
    return user_seq


def scrap_problem_solved(args_time_interval):
    handles = pd.read_csv(file_path + 'users_221002.csv')['handle']

    output_file = open(file_path + 'user_solved_problems_221002.csv', mode='w', encoding='utf-8-sig', newline='')
    writer = csv.writer(output_file)
    writer.writerow(['handle', 'problems'])

    for handle in handles:
        output_file = open(file_path + 'user_solved_problems_221002.csv', mode='a', encoding='utf-8-sig', newline='')
        writer = csv.writer(output_file)
        print(f"Get handle {handle} now!")
        problems_list = total_solved_problem_seq_crawling(handle)
        print(f"problem list: {problems_list}")
        problems = ",".join(list(problems_list))
        writer.writerow([handle, problems])
        time.sleep(args_time_interval)

scrap_problem_solved(0)