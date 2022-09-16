import time
import json
import requests
import csv

headers = { "Content-Type": "application/json" }
base_url = "https://solved.ac/api/v3/"
search_problem_url = "search/problem"
start = 263

class Problems():
    def __init__(self):
        return

    def __repr__(self):
        return f"problems('{self.id}', {self.problem_id}', '{self.title}', '{self.tags}'," \
               f"'{self.is_solvable}', '{self.accepted_user_count}', '{self.level}', '{self.average_tries}')"

def scrap_problem_per_page(page: int):
    url = base_url + search_problem_url
    querystring = {"query": " ", "page": f"{page}"}

    if page == start:
      output_file = open('problems.csv', mode='w')
      writer = csv.writer(output_file)
      writer.writerow(['problemId', 'titleKo', 'isSolvable', 'acceptedUserCount', 'level',
                      'averageTries', 'tags'])
    else:
        output_file = open('problems.csv', mode='a')
        writer = csv.writer(output_file)

    response = requests.request("GET", url, headers=headers, params=querystring)

    result = dict()
    result["item"] = json.loads(response.text).get("items")
    for item in result["item"]:
        problem = Problems()
        problem.problem_id = int(item.get("problemId"))
        problem.title = item.get("titleKo")
        problem.is_solvable = item.get("isSolvable")
        problem.accepted_user_count = int(item.get("acceptedUserCount"))
        problem.level = int(item.get("level"))
        problem.average_tries = int(item.get("averageTries"))

        tags = []
        tags_data = item.get("tags")

        if tags_data:
            for tag in tags_data:
                tags.append(tag.get("key"))

            problem.tags = ",".join(tags)

        writer.writerow([problem.problem_id, problem.title, problem.is_solvable, problem.accepted_user_count, problem.level,
                          problem.average_tries, problem.tags if len(tags_data) > 0 else None])

def scrap_problem(args_time_interval):
    time_interval = args_time_interval
    url = base_url + search_problem_url
    querystring = {"query": " ", "page": str(start)}

    try:
        response = requests.request("GET", url, headers=headers, params=querystring)
        num_problem = json.loads(response.text).get("count")
        print(num_problem)
    except:
        print("Connection Failed")
        return

    start_page = start
    end_page = int(num_problem / 50) + (num_problem % 50 > 0)
    #end_page = 1

    for page in range(start_page, end_page + 1):
        print(f"Get page {page} now and still {end_page - page} left!")
        scrap_problem_per_page(page)
        time.sleep(time_interval)

scrap_problem(20)