const slider = document.querySelector(".slider"),
  sliderList = slider.querySelector(".slider__list"),
  slides = slider.querySelectorAll(".slide"),
  sliderToggles = slider.querySelectorAll(".slider__toggle");

// go to last
const last = slides.length - 1;
goToSlide(last);
sliderToggles[last].checked = true;

sliderToggles.forEach((toggle, index) => {
  toggle.onchange = () => {
    goToSlide(index);
  };
});

function goToSlide(index) {
  const slideCoordinate = slides[index].getBoundingClientRect().x,
    startPoint = sliderList.getBoundingClientRect().x,
    shift = slideCoordinate - startPoint;

  sliderList.scrollLeft += shift;
}
