import pygame
import sys
import random #운석이 여러개로 떨어짐
from time import sleep


#background.png를 사용하게 되므로 "BlACK=(0,0,0)을 뺐다.-> #게임첫 화면 색(RGB를 0으로설정)"
padWidth=480 #게임화면 가로크기
padHeight=640 #게임화면 높이
rockImage = ['rock01.png','rock02.png','rock03.png','rock04.png','rock05.png','rock06.png','rock07.png',
             'rock08.png','rock09.png','rock10.png','rock11.png','rock12.png','rock13.png','rock14.png',
             'rock15.png','rock16.png','rock17.png','rock18.png','rock19.png','rock20.png','rock21.png',
             'rock22.png','rock23.png','rock24.png','rock25.png','rock26.png','rock27.png','rock28.png',
             'rock29.png','rock30.png'] #운석 이미지
explosionSound=['explosion01.wav','explosion02.wav','explosion03.wav','explosion04.wav'] #배경 음악들


#*1.맞춘 운석 수 계산
def writeScore(count):
    global gamePad
    font = pygame.font.Font('NanumGothic.ttf',20) #글씨 폰트, 20은 글씨 크기
    text=font.render('파괴한 운석 수:' + str(count), True,(255,255,255)) #쓸 말과 파괴 운석 수 계산, 글씨 색(RGB255면 흰색)
    gamePad.blit(text,(0,0)) #글씨가 있을 위치

#*2.못 맞춘 운석 수 계산
def writePassed(count):
    global gamePad
    font = pygame.font.Font('NanumGothic.ttf',20)
    text=font.render('놓친 운석 수:' + str(count), True,(255,0,0)) #글씨 색깔은 빨간색
    gamePad.blit(text,(340,0))                      

#게임 오버 메세지 출력& 게임 사운드
def writeMassage(text):
    global gamePad, gameOverSound
    font = pygame.font.Font('NanumGothic.ttf',80)
    text=font.render(text, True,(255,0,0))
    textpos = text.get_rect()              #잘 이해 안가긴 하는데, text의 포지션은 Length에서 실제 포지션을 정해준다.              
    textpos.center=(padWidth/2,padHeight/2) #정중앙에 글씨 출력
    gamePad.blit(text, textpos) #실제적으로 화면에 글씨가 출력
    pygame.display.update()
    pygame.mixer.music.stop() #게임 배경 음악 정지(게임이 오버 됐기 때문)
    gameOverSound.play() #게임 오버 사운드
    sleep(2) #게임 오버 돼서 2초 쉬고 runGame() 으로 인해서 게임이 다시 실행
    pygame.mixer.music.play(-1) #다시 게임 배경 음악 재생
    runGame() #우리는 동전 넣고 하는게 아니라 게임 무제한 으로 재생 가능                          

#전투기가 운석에 충돌했을 경우 메세지 출력
def crash():
    global gamePad
    writeMassage('전투기 파괴!')

#게임 오버 메세지 출력
def gameOver():
    global gamePad
    writeMassage('Game Over!')
                                
def drawObject(obj,x,y):    #게임에 그려질 배경그림들(예를 들면 우주배경)
    global gamePad
    gamePad.blit(obj,(x,y)) #x,y 좌표로 부터 그 그 오브젝에 그림을 그려라
    
def initGame():   #게임 초기화 하는 부분
    global gamePad, clock, background, fighter, missile, explosion, missileSound, gameOverSound
    pygame.init() #pygame이라는 라이브러리를 또 초기화 시켜줘야됨.
    gamePad=pygame.display.set_mode((padWidth,padHeight)) #게임패드 구성
    pygame.display.set_caption('shooooooting!!!!!!!!') #게임제목
    background=pygame.image.load('background.png') #배경그림
    fighter=pygame.image.load('fighter.png') #전투기 그림
    missile=pygame.image.load('missile.png') #미사일그림
    explosion=pygame.image.load('explosion.png') #미사일로 운석을 폭파할 때 나오는 이미지
    pygame.mixer.music.load('music.wav') #게임 배경 음악
    pygame.mixer.music.play(-1)
    missileSound=pygame.mixer.Sound('missile.wav') #미사일 쐈을 때 배경 음악
    gameOverSound=pygame.mixer.Sound('gameover.wav') #게임 오버 됐을 때 배경 음악
    clock=pygame.time.Clock()


def runGame(): #게임을 실행하게 할 함수
    global gamePad, clock, background, fighter, missile, explosion, missileSound, gameOverSound
    #전투기 관련
    fighterSize= fighter.get_rect().size #전투기 이미지 사이즈를 가져온 뒤에
    fighterWidth= fighterSize[0] #이미지의 폭과 너비를 지정
    fighterHeight=fighterSize[1]
    #전투기의 초기 위치(x,y)
    x=padWidth*0.45
    y=padHeight*0.9
    fighterX=0

    #미사일관련
    missileXY=[]

    #운석 랜덤 생성
    rock= pygame.image.load(random.choice(rockImage)) #30개 운석중 1개를 랜덤으로 불러움.
    rockSize=rock.get_rect().size #30개다 운석의 크기가 다름
    rockWidth=rockSize[1] #그래서 각 운석의 폭과 너비를 가져옴.
    rockHeight=rockSize[1]
    destroySound = pygame.mixer.Sound(random.choice(explosionSound)) #운석 사운드 랜덤 재생

    #운석 초기 위치 설정
    rockX = random.randrange(0, padWidth-rockWidth) #X좌표만 랜덤으로 하면 됨.
    rockY=0 #꼭대기부터 운석이 떨어지니깐
    rockSpeed=2 #운석 속도

    #전투기 미사일에 운석이 맞았을 경우 True
    isShot=False 
    shotCount = 0 #운석을 맞췄을 때 카운트
    rockPassed = 0 #운석을 놓쳤을 때 카운트

    
    onGame=False
    while not onGame:
        for event in pygame.event.get():
            if event.type in [pygame.QUIT]: #게임프로그램 종료(원래 더 이벤트를 추가할 수도 잇는데 일단 처음이라)
                pygame.quit()     #윗줄의 QUIT을 하면 pygame을 종료시키고,
                sys.exit()      #시스템을 종료시킨다.

            if event.type in [pygame.KEYDOWN]: #전투기 방향 (KEYDOWN은 키를 누른다는 의미)
                if event.key == pygame.K_LEFT: #전투기 왼쪽으로 5씩 움직여라(즉 -)
                    fighterX -=5

                elif event.key == pygame.K_RIGHT: #전투기 오른쪽으로 5씩 움직여라(즉+)
                    fighterX +=5

                elif event.key == pygame.K_SPACE: #미사일이 스페이스로 발사
                    missileSound.play() #미사일 사운드
                    missileX = x+fighterWidth/2 #미사일이 전투기의 딱 중앙에서 발사될수 있도록 2로 나눔.
                    missileY = y-fighterHeight #전투기의 가장 맨 밑쪽에서 미사일이 튀나오도록 전체값 빼줌
                    missileXY.append([missileX,missileY])

            if event.type in [pygame.KEYUP]: #KEYUP은 키를 안누르고 있는것을 의미
                if event.key == pygame.K_LEFT or event.key ==pygame.K_RIGHT: #fighterX= 0 이므로 오른쪽 왼쪽으로5도 다 움직이지 않는 다는 것을 의미
                    fighterX= 0


    # 여기도 background.png로 인해서  "gamePad.fill(BlACK) 을 다시 빼줌. #게임 화면을 블랙으로 채워라."
            
         

        drawObject(fighter, x, y) #전투기를 게임 화면에 (x,y) 좌표로 띄어줌

        drawObject(background, 0, 0) #게임 배경화면
       
       #전투기가 밖으로 나가지 않게             
        x += fighterX
        if x< 0: #전투기가 밖으로 나가면 안됨. 따라서 x가 음수가 되면, 0으로 만들어줌
            x= 0
        elif x> padWidth - fighterWidth: #padWidth(게임화면크기)를 넘어서 x가 이동되면 전투기를 끝까지만 만들어줌.
            x= padWidth - fighterWidth

       #전투기가 운석과 충돌했는지 체크
        if y< rockY + rockHeight:
            if(rockX > x and rockX < x + fighterWidth) or \
                     (rockX + rockWidth > x and rockX + rockWidth < x + fighterWidth):
                     crash()
                     
        drawObject(fighter, x, y) #전투기가 죽었기 때문에 다시 그려줘야 함.
       
       #미사일 발사화면&여러개의 미사일을 발사하게
        if len(missileXY)!=0:
            for i, bxy in enumerate(missileXY): #미사일 요소에 대해 반복함
                bxy[1] -=10  #총알이 y좌표 -10씩 (즉 미사일이 위로 이동) 
                missileXY[i][1]=bxy[1]

                #미사일이 운석을 맞췄을 때 카운트
                if bxy[1]<rockY:
                   if bxy[0]>rockX and bxy[0] < rockX +rockWidth: #운석에 미사일이 겹쳐지면
                        missileXY.remove(bxy) #운석을 맞춰서 미사일이 제거
                        isShot=True 
                        shotCount += 1  #맞춰져서 카운트


                if bxy[1] <=0: #미사일이 화면 밖을 벗어나면
                   try:
                      missileXY.remove(bxy) #미사일이 사라지도록
                   except:
                      pass

        if len(missileXY)!=0:  #미사일이 0이 아니면 미사일을 다시 그려줘야한다.
            for bx, by in missileXY:
                drawObject(missile, bx, by)

       #운석 맞춘 점수 표시         
        writeScore(shotCount)
       
       #**1.운석이 밖으로 나갔을 때
        rockY += rockSpeed #운석이 아래로 떨어지는 Y좌표값에 맞춰 떨어지니깐 y좌표에 속도를 적용.

        if rockY>padHeight: #운석이 지구 밖으로 나갔기 때문에 새로운 운석이 다시 나와야 함.
            rock= pygame.image.load(random.choice(rockImage)) #새로운 운석 랜덤
            rockSize=rock.get_rect().size 
            rockWidth=rockSize[1] 
            rockHeight=rockSize[1]
            rockX= random.randrange(0, padWidth-rockWidth)
            rockY=0
            rockPassed += 1
            
       #운석 놓친 개수가 3개면 게임 오버
        if rockPassed == 3:
            gameOver() 
            
       #운석 놓친 점수 표시
        writePassed(rockPassed)     
       #**2.운석을 맞췄을 때
        if isShot:
             drawObject(explosion,rockX,rockY) #운석이 폭발에 버렸으므로 게임에 나오도록 다시 그려줘야함.
             destroySound.play() #운석 폭발 사운드 재생
             rock= pygame.image.load(random.choice(rockImage)) #새로운 운석 랜덤
             rockSize=rock.get_rect().size 
             rockWidth=rockSize[1] 
             rockHeight=rockSize[1]
             rockX= random.randrange(0, padWidth-rockWidth)
             rockY=0
             destroySound = pygame.mixer.Sound(random.choice(explosionSound)) #운석 사운드 랜덤 재생
             isShot=False

             #운석 맞췄을 때 속도 증가
             rockSpeed += 0.1 #0.02씩 속도가 증가.
             if rockSpeed >= 12: #보통 10이 넘으면 너무 빨라서 게임 불가 
                 rockSpeed = 12
 
                  
        drawObject(rock,rockX,rockY) #운석이 게임 화면에 나오도록
      
        pygame.display.update() #게임화면을 다시그려줌(업데이트

        clock.tick(60) #게임플레이가 초당 60으로 진행

    pygame.quit() #게임 종료
        
     
initGame()  #initGame과 runGame을 위에다가 정의 했으니깐 실행 시켜주는 거임
runGame()
