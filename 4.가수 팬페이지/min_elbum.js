const elbum_info = document.querySelectorAll(".elbum_info");
function isbottom(a, trigger) {
  const { top } = a.getBoundingClientRect();
  const { innerHeight } = window;
  return top > innerHeight + (trigger || 0);
}
function handleScroll() {
  elbum_info.forEach((a) => {
    if (isbottom(a, -400)) {
      a.style.opacity = "0";
      a.style.transform = "translateY(20rem)";
    } else {
      a.style.opacity = "1";
      a.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", handleScroll);
