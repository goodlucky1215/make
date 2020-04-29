// Scroll Indicator

window.onscroll = function() {
  myFunction()
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};

var timeleft = 5;

if($('#ad-btn').click(function() {
  var adTimer = setInterval(function(){
    $('#confirm').show();
    document.getElementById("confirm").innerHTML = timeleft + " 초 남았습니다.";
    timeleft -= 1;
    if(timeleft <= -1){
      clearInterval(adTimer);
      document.getElementById("confirm").innerHTML = "확인";
      document.getElementById("confirm").disabled = false;
    }
  }, 1000);
}))

$(function () {
  var lastScrollTop = 0;
  var $navbar = $('.navbar');
  var navbarHeight = $navbar.outerHeight();
  var movement = 0;
  var lastDirection = 0;

  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    movement += st - lastScrollTop;

    if (st > lastScrollTop) { // scroll down
      if (lastDirection != 1) {
        movement = 0;
      }
      var margin = Math.abs(movement);
      if (margin > navbarHeight) {
        margin = navbarHeight;
      }
      margin = -margin;
      $navbar.css('margin-top', margin+"px")

      lastDirection = 1;
    } else { // scroll up
      if (lastDirection != -1) {
        movement = 0;
      }
      var margin = Math.abs(movement);
      if (margin > navbarHeight) {
        margin = navbarHeight;
      }
      margin = margin-navbarHeight;
      $navbar.css('margin-top', margin+"px")

      lastDirection = -1;
    }

    lastScrollTop = st;
    // console.log(margin);
  });
});

$(document).ready(function() {
    $( ".mr-auto .nav-item" ).bind( "click", function(event) {
        event.preventDefault();
        var clickedItem = $( this );
        $( ".mr-auto .nav-item" ).each( function() {
            $( this ).removeClass( "active" );
        });
        clickedItem.addClass( "active" );
    });
});
