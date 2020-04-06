const header = document.querySelector(".page-header");

showHideOnScroll(header);

const mainNavLinks = header.querySelectorAll(".main-nav__link"),
  mainSections = document.querySelectorAll("main section");

// console.log(mainNavLinks);
// console.log(mainSections);

// let lastId;
// let cur = [];
/*
window.addEventListener("scroll", (event) => {
  let fromTop = window.pageYOffset;

  mainNavLinks.forEach((link) => {
    let section = document.querySelector(link.hash);

    // console.log(link.hash);
    console.log(section.offsetTop <= fromTop);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add(".main-nav__link--current");
    } else {
      link.classList.remove(".main-nav__link--current");
    }
  });
}); */

function showHideOnScroll(element) {
  let prevScrollPos = window.pageYOffset;

  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      header.style.top = "0";
    } else {
      header.style.top = `-${header.offsetHeight}px`;
    }
    prevScrollPos = currentScrollPos;
  };
}
