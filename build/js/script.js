let prevScrollPos = window.pageYOffset;

let header = document.querySelector(".page-header");

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-100px";
  }
  prevScrollPos = currentScrollPos;
};
