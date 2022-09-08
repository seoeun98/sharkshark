import requests
from bs4 import BeautifulSoup
import json
import csv


# https://solved.ac/api/v3/ranking/tier?page=1
def get_users_on_page(page_num):
    response = requests.get(f"https://solved.ac/api/v3/ranking/tier?page={page_num}")
    soup = BeautifulSoup(response.text, "html.parser")
    soup = str(soup)
    return soup


def save_to_json(json_param):
    with open('user.json', 'w', encoding='UTF-8-sig') as f:
        f.write(json.dumps(json_param, ensure_ascii=False))


def save_to_csv(page_num):
    with open('user.json', 'r', encoding="UTF-8-sig", newline="") as input_file:
        data = []
        for line in input_file:
            tmp = json.loads(line)
            data.append(tmp)

        json_data = json.loads(data[0])

    items = json_data["items"]

    if page_num == 1:
        output_file = open('users.csv', mode='w')
        writer = csv.writer(output_file)
        writer.writerow(['handle', 'solved_count', 'user_class', 'tier', 'rating',
                         'rating_by_problems_sum', 'rating_by_class', 'rating_by_solved_count',
                         'exp', 'rival_count', 'reverse_rival_count', 'max_streak',
                         'rank', 'organization'])
    else:
        output_file = open('users.csv', mode='a')
        writer = csv.writer(output_file)
    for idx, item in enumerate(items):
        writer.writerow([item["handle"], item["solvedCount"], item["class"], item["tier"], item["rating"],
                         item["ratingByProblemsSum"], item["ratingByClass"], item["ratingBySolvedCount"],
                         item["exp"], item["rivalCount"], item["reverseRivalCount"], item["maxStreak"],
                         rank+idx+1, item["organizations"][0]["organizationId"] if len(item["organizations"])>0 else None])
    return


if __name__ == '__main__':
    for i in range(1, 3):
        json_str = get_users_on_page(i)
        save_to_json(json_str)
        rank = 100*(i-1)
        save_to_csv(i)
        print(f"SUCCESS : {i} page")
