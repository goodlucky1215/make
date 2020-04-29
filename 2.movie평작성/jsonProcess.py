# jsonProcess.py 최종 코드
# 주석은 지우셔도 됩니다

import requests
import json
from Movie import Movie

def getMovie(page):
    url = "https://yts.am/api/v2/list_movies.json?sort_by=rating&limit=20&page=1"
    response = requests.get(url = url)

# 1. dict를 json타입으로 변경하는 방법   
# => json.dumps() - json output



# 2. json타입을 dict으로 변경하는 방법
# => json.loads() - json input

    html = json.loads(response.text)
#print(html)
#print(type(html))

    data = html['data']
#print(data)
#print(type(data))

    movies = data['movies']
#print(movies)
#print(type(movies))

# print(movies[0]['id'])
# print(movies[0]['title'])
# print(movies[0]['rating'])
# print(movies[0]['url'])
# print(movies[0]['synopsis'])

    list = []
    for i in movies:
        m = Movie(
            i['rating'], 
            i['title'],
            i['synopsis'], 
            i['medium_cover_image'],
            i['url'] 
        )
        list.append(m)

    return list
