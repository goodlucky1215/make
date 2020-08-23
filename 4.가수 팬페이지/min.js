const info = document.querySelectorAll(".info");

//헤더부분
//클릭 시 나타는 화면 보여줌
function click() {
  //let of를 써서 info리스트들의 value 값을 불러움
  for (let value of info) {
    //특정  value값을 클릭하는 addEventListener 만듬
    value.addEventListener("click", function () {
      // 그 value안에 들어 있는 html값을 불러와서 htmlname에 저장
      htmlname = value.innerHTML;
      // 그리고 value값을 클릭 시 불러 낼 html을 열기 위한 urlname을 저장
      urlname = "min_" + htmlname + ".html";
      //location.href으로 그 페이지를 불러옴.
      location.href = urlname;
    });
  }
}

function init() {
  click();
}
init();
