const password_see1 = document.getElementById('password_see1');
const password_see2 = document.getElementById('password_see2');
const password = document.getElementById('password');

function password_event1() {
    if (password.type == 'password') {
        password.type = 'text';
        password_see1.style.display = "none";
        password_see2.style.display = "block";
    }
    else {
        password.type = 'password';
        password_see1.style.display = "block";
        password_see2.style.display = "none";
    }
}

