"use strict";

const header = document.querySelector(".page-header"),
  mainNavLinks = header.querySelectorAll(".main-nav__link");

showHideOnScroll(header);

activeNavLinkOnScroll(mainNavLinks, "main-nav__link--current");

function activeNavLinkOnScroll(links, classToAdd) {
  window.addEventListener("scroll", () => {
    let fromTop = window.pageYOffset;

    links.forEach((link) => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop - 80 <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add(classToAdd);
      } else {
        link.classList.remove(classToAdd);
      }
    });
  });
}

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
