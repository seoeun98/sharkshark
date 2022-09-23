import requests
from bs4 import BeautifulSoup

file_path = '/content/drive/MyDrive/SSAFY/'
headers = {'User-Agent': "Mediapartners-Google"}


def user_message_crawling(username: str) -> str:
    url = f'https://www.acmicpc.net/user/{username}'

    response = requests.request("GET", url, headers=headers)

    if response.status_code == 404:
        user_msg = 'Not-Found-User'
    else:
        soup = BeautifulSoup(response.text, 'html.parser')
        user_msg = soup.find('blockquote', {'class': 'no-mathjax'}).text.split('정보언어')[0]
    return user_msg
