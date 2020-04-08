const slider = document.querySelector(".slider"),
  sliderList = slider.querySelector(".slider__list"),
  slides = slider.querySelectorAll(".slider__slide"),
  sliderToggles = slider.querySelectorAll(".slider__toggle");

// go to last
// goToSlide(slides.length - 1);
// goToSlide(1);

sliderToggles.forEach((toggle, index) => {
  toggle.onchange = () => {
    // debugger;
    // console.log(index);
    goToSlide(index);
  };
});

function goToSlide(index) {
  const coords = slides[index].getBoundingClientRect();
  console.log(coords);
  sliderList.scrollLeft += coords.x;
}
