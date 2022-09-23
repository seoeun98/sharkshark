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

def lately_solved_problem_seq_crawling(username : str) -> list:
    url = f'https://www.acmicpc.net/status?problem_id=&user_id={username}&language_id=-1&result_id=4'
    
    lately_solved_problems = []

    for page in range(1, 4):      
      response = requests.request("GET", url, headers=headers)
      soup = BeautifulSoup(response.text, 'html.parser')
      problems = soup.find_all('tr')

      for i in range(1, len(problems)):
          try:
              lately_solved_problems.append([username, problems[i].select_one('td:nth-of-type(3) > a').text, problems[i].select_one('td:nth-of-type(9) > a')['title']])
          except:
              lately_solved_problems
      try:
          url = 'https://www.acmicpc.net' + soup.find('a', {'id':'next_page'})['href']
      except: 
          return lately_solved_problems      

    return lately_solved_problems

def scrap_problem_lately_solved(args_time_interval):
    handles = pd.read_csv(file_path + 'users.csv')['handle']

    output_file = open(file_path + 'user_lately_solved_problems.csv', mode='w', encoding='utf-8-sig', newline='')
    writer = csv.writer(output_file)
    writer.writerow(['handle', 'problems', 'timestamp'])

    for handle in handles:
        output_file = open(file_path + 'user_lately_solved_problems.csv', mode='a', encoding='utf-8-sig', newline='')
        writer = csv.writer(output_file)
        print(f"Get handle {handle} now!")
        problems_list = lately_solved_problem_seq_crawling(handle)
        for problem in problems_list:
            writer.writerow(problem)
        time.sleep(args_time_interval)

scrap_problem_lately_solved(0)