"use strict";

const header = document.querySelector(".page-header"),
  toggle = header.querySelector(".main-nav__toggle"),
  mainNavList = header.querySelector(".main-nav__list"),
  mainNavLinks = mainNavList.querySelectorAll(".main-nav__link");

const pageMain = document.querySelector(".page-main"),
  pageFooter = document.querySelector(".page-footer");

const sideNav = document.querySelector(".side-nav"),
  sideNavLinks = sideNav.querySelectorAll(".side-nav__link");

showHideOnScroll(header);
changeElementNotOnTop(header, "shrink");
activeNavLinkOnScroll(mainNavLinks, "current");
activeNavLinkOnScroll(sideNavLinks, "current");

const toggleOpenClass = createModifiedClass(toggle, "open"),
  navOpenClass = createModifiedClass(mainNavList, "show"),
  headOpenClass = createModifiedClass(header, "shifted"),
  mainOpenClass = createModifiedClass(pageMain, "shifted");

toggle.onclick = () => {
  mobileSwitchState();
  toggle.blur();
};

mainNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileSwitchState();
  });
});

function mobileSwitchState() {
  toggle.classList.toggle(toggleOpenClass);
  mainNavList.classList.toggle(navOpenClass);
  header.classList.toggle("shifted");
  pageMain.classList.toggle("shifted");
  pageFooter.classList.toggle("shifted");
}

function activeNavLinkOnScroll(links, classMod = "mod") {
  // All links have the same classes, so any element suitable.
  const newClass = createModifiedClass(links[0], classMod);

  window.addEventListener("scroll", () => {
    let fromTop = window.pageYOffset;

    links.forEach((link) => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop - 80 <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        link.classList.add(newClass);
      } else {
        link.classList.remove(newClass);
      }
    });
  });
}

function showHideOnScroll(element) {
  let startScrollPos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    let currentScrollPos = window.pageYOffset;
    const elementHeight = element.offsetHeight;

    if (startScrollPos > currentScrollPos) {
      element.style.top = "0";
    } else {
      element.style.top = `-${elementHeight}px`;
    }
    startScrollPos = currentScrollPos;
  });
}

function changeElementNotOnTop(element, classMod = "mod") {
  const elementHeight = element.offsetHeight,
    newClass = createModifiedClass(element, classMod);

  window.addEventListener("scroll", () => {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > elementHeight) {
      element.classList.add(newClass);
    } else {
      element.classList.remove(newClass);
    }
  });
}

function createModifiedClass(element, mod) {
  const classBase = element.className,
    newClass = classBase + "--" + mod;
  return newClass;
}
