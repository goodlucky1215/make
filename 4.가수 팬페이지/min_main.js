const img = document.querySelectorAll(".img"),
  next = document.querySelector(".next"),
  back = document.querySelector(".back"),
  slider = document.querySelector("#slider"),
  slider_img = document.querySelector("#slider_img"),
  dot = document.getElementsByClassName("dot");

//이미지 넘기기
let sliderindex = 0; //보이게 만들 인덱스 설정
let sliderwidth = slider.clientWidth; //슬라이더의 길이
let totalimg = img.length; //총 이미지 갯수
slider_img.style.width = sliderwidth * totalimg + "px"; //전체 이미지들 길이를 slider_img에 넣어줌

function showslide(n) {
  sliderindex = n; //아래의 next와 back에 따라서 sliderindex값 생성
  if (sliderindex == -1) {
    //만약 범위를 넘는다면
    sliderindex = totalimg - 1; //총 이미지 갯수 중에 제일 마지막에 있는 index수 불러옴(-1을 하는 이유는 sliderindex값을 0부터 세기 때문)
  } else if (sliderindex === totalimg) {
    //만약 totaling갯수와 같다면 제일 처음 이미지를 불러오면 되므로 sliderindex를 0으로 바꿔줌.
    sliderindex = 0;
  }
  //slider_img의 총 width중에서 left를 불러서 그 값만큼 빼서 이미지를 움직여서,
  //css에 설정해 둔 각각의 이미지 width만큼만 불러오게 됨.
  slider_img.style.left = -(sliderwidth * sliderindex) + "px";
}

next.addEventListener("click", function () {
  //next 앞으로 가는 키를 누르면 발생하는 addEventListener 발생
  sliderindex++; //slider index가 더해짐
  showslide(sliderindex); //showslide에 그 값을 넣어줘서 실행
});
back.addEventListener("click", function () {
  //back으로 뒤로 가는 키를 누르면 발생하는 addEventListener 발생
  sliderindex--; //slider indexrk 빼짐
  showslide(sliderindex); //showslide에 그 값을 넣어줘서 실행
});

//이미지 3초에 자동으로 움직이기
function timeslide() {
  //sliderindex값을 1 증가
  sliderindex++;
  //만약 totaling의 값과 같아진다면 다시 처음 이미지로 돌아와야 하므로,
  if (sliderindex === totalimg) {
    //sliderindex값을 0으로 변경.
    sliderindex = 0;
  }
  //slider_img의 총 width중에서 left를 불러서 그 값만큼 빼서 이미지를 움직여서,
  //css에 설정해 둔 각각의 이미지 width만큼만 불러오게 됨.
  slider_img.style.left = -(sliderwidth * sliderindex) + "px";
  setTimeout(timeslide, 3000);
}

//클릭하면 이미지 바꾸기
for (let i = 0; i < dot.length; i++) {
  /* 이미지 인덱스 길이를 확인 */
  dot[i].addEventListener("click", function () {
    /*각 각의 이미지 인덱스 중 클릭시에 이벤트 발생 */ slider_img.style.left =
      -(sliderwidth * i) +
      "px"; /* 이미지 인덱스에 따라서 왼쪽으로 -만큼 움직여서 이미지를 보여줌 */
  });
}

function init() {
  timeslide();
}
init();
