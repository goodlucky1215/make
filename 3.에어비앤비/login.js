const id_box = document.getElementById("id_box");
const email_box = document.getElementById("email_box");
const id = document.getElementById("id");
const email = document.getElementById("email");
const email_login = document.getElementById("email_login");
const password_see = document.getElementById("password_see");
const password = document.getElementById("password");
const fa_unlock_alt = document.getElementsByClassName("fa-unlock-alt");
const fa_lock = document.getElementsByClassName("fa-lock");

function id_event() {
  if (email_login.innerText == "이메일로 로그인") {
    id.type = "text";
    id_box.style.display = "none";
    email_box.style.display = "block";
    email_login.innerText = "전화번호로 로그인";
  } else {
    id.type = "password";
    id_box.style.display = "block";
    email_box.style.display = "none";
    email_login.innerText = "이메일로 로그인";
  }
}

function password_event() {
  if (password.type == "password") {
    password.type = "text";
    password_see.innerText = "비밀번호 숨기기";
  } else {
    password.type = "password";
    password_see.innerText = "비밀번호 보이기";
  }
}
