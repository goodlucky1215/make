# 첫번째는 플라스크 서버 임포트
from flask import Flask

# 두번째는 list를 보낼때 쓰는 모듈
from flask import render_template

from jsonProcess import getMovie


# Flask 서버 자체가 app에 담겼습니다
# 즉 app이 플라스크 서버 그 자체라는 뜻
# 여기서 __name__은 __main__입니다(메인이라는 뜻)
app = Flask(__name__)


# /로 들어오면 welcom index page 리턴해줌
@app.route('/')
def index():
    return 'Welcome index page'

#/movie/<page>로 들어오면 movie.html 리턴해주고 list에 정보가 담겨 넘어감
@app.route('/movie/<page>')
def movie(page):
    print(page)
    list = getMovie(page)
    return render_template('movie.html', list=list)

# 0.0.0.0은 누구나 들어 올 수 있고
# port는 9000번
# 디버그 모드 작용
## 중요한 점은 절대 여기서 실행하지 말고 cmd에서 실행 할 것!!
if __name__=="__main__":
    app.run(host='0.0.0.0', port=9000, debug=True)