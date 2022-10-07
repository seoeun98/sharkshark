import time
import json
import requests
import csv

headers = { "Content-Type": "application/json" }
base_url = "https://solved.ac/api/v3/"
search_user_url = "ranking/tier"
file_path = '../data/'
start = 448

class Users:
    def __init__(self):
      return

    def __repr__(self):
        return f"users('{self.id}', {self.handle}', '{self.solved_count}', '{self.user_class}'," \
               f"'{self.tier}', '{self.rating}', '{self.rating_by_problems_sum}'" \
               f"'{self.rating_by_class}', '{self.rating_by_solved_count}', '{self.exp}'," \
               f"'{self.rival_count}', '{self.reverse_rival_count}', '{self.max_streak}'," \
               f"'{self.rank}', '{self.organization}')"

def scrap_user_per_page(page: int):
    url = base_url + search_user_url
    querystring = {"page": f"{page}"}

    if page == start:
      output_file = open(file_path + 'users_221002.csv', mode='w', encoding='utf-8-sig', newline='')
      writer = csv.writer(output_file)
      writer.writerow(['handle', 'solved_count', 'user_class', 'tier', 'rating',
                      'rating_by_problems_sum', 'rating_by_class', 'rating_by_solved_count',
                      'exp', 'rival_count', 'reverse_rival_count', 'max_streak',
                      'rank', 'organization'])
    else:
        output_file = open(file_path + 'users_221002.csv', mode='a', encoding='utf-8-sig', newline='')
        writer = csv.writer(output_file)

    response = requests.request("GET", url, headers=headers, params=querystring)

    result = dict()
    result["item"] = json.loads(response.text).get("items")
    
    for index, item in enumerate(result["item"]):
        user = Users()
        user.handle = item.get("handle")
        user.solved_count = int(item.get("solvedCount"))
        user.user_class = int(item.get("class"))
        user.tier = int(item.get("tier"))
        user.rating = int(item.get("rating"))
        user.rating_by_problems_sum = int(item.get("ratingByProblemsSum"))
        user.rating_by_class = int(item.get("ratingByClass"))
        user.rating_by_solved_count = int(item.get("ratingBySolvedCount"))
        user.exp = int(item.get("exp"))
        user.rival_count = int(item.get("rivalCount"))
        user.reverse_rival_count = int(item.get("reverseRivalCount"))
        user.max_streak = int(item.get("maxStreak"))
        user.rank = (page - 1) * 50 + (index + 1)            

        organizations = []
        organizations_data = item.get("organizations")

        if organizations_data:
            for organization in organizations_data:
                organizations.append(str(organization.get("organizationId")))

            user.organization = ",".join(organizations)
      
        writer.writerow([user.handle, user.solved_count, user.user_class, user.tier, user.rating,
                          user.rating_by_problems_sum, user.rating_by_class, user.rating_by_solved_count,
                          user.exp, user.rival_count, user.reverse_rival_count, user.max_streak,
                          user.rank, user.organization if len(organizations_data) > 0 else None])


def scrap_user(args_time_interval):
    url = base_url + search_user_url
    querystring = {"page": str(start)}

    try:
        response = requests.request("GET", url, headers=headers, params=querystring)
        num_user = json.loads(response.text).get("count")
    except:
        print("Connection Failed")
        return

    start_page = start    
    end_page = int(num_user / 50) + (num_user % 50 > 0)
    #end_page = 1
    time_interval = args_time_interval

    for page in range(start_page, end_page + 1):
        print(f"Get page {page} now and still {end_page - page} left!")
        scrap_user_per_page(page)       
        time.sleep(time_interval)

scrap_user(10)