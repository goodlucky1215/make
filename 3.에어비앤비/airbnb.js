const person = document.getElementById("person"),
  person_form = document.getElementById("person_form"),
  minu = document.getElementsByClassName("minu"),
  plus = document.getElementsByClassName("plus");
let all_number = document.getElementsByClassName("all_number"),
  number = document.getElementsByClassName("number");
person.addEventListener("click", function () {
  if (person_form.style.display == "none") {
    person_form.style.display = "block";
  } else {
    person_form.style.display = "none";
  }
});
for (let i = 0; i < minu.length; i++) {
  minu[i].addEventListener("click", function () {
    let a = number[i].innerHTML;
    let all_a = all_number[0].innerHTML;
    parseInt(a);
    if (a > 0) {
      a--;
      all_a--;
      number[i].innerHTML = a;
      all_number[0].innerHTML = all_a;
    }
  });
}
for (let i = 0; i < plus.length; i++) {
  plus[i].addEventListener("click", function () {
    let a = number[i].innerHTML;
    let all_a = all_number[0].innerHTML;
    parseInt(a);
    a++;
    all_a++;
    number[i].innerHTML = a;
    all_number[0].innerHTML = all_a;
  });
}
