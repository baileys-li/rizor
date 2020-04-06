"use strict";

findVideos();

function findVideos() {
  const videos = document.querySelectorAll(".video");

  videos.forEach((video) => {
    setupVideo(video);
  });
  // videos.forEach(setupVideo(video));
}

function setupVideo(video) {
  const link = video.querySelector(".video__link"),
    media = video.querySelector(".video__preview"),
    play = video.querySelector(".video__play"),
    id = video.dataset.id;

  video.onclick = () => {
    let iframe = createIframe(id);

    link.remove();
    play.remove();
    video.appendChild(iframe);
  };

  link.removeAttribute("href");
}

function createIframe(id) {
  let iframe = document.createElement("iframe");
  iframe.classList.add("video__preview");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("src", generateURL(id));

  return iframe;
}

function generateURL(id) {
  const extraOptions = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + extraOptions;
}
