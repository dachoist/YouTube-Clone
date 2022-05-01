const id = "AIzaSyBDBMHv8i2cLRuhMgUPcbkvpHis51WrX2U";
const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${id}&maxResults=10&q=`;
const iframe = document.querySelector("iframe");
const main = document.querySelector("main");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const request = new XMLHttpRequest();

function createVideos(items) {
  main.innerHTML = "";
  items.forEach((e) => {
    let video = document.createElement("div");
    let title = document.createElement("h2");
    let desc = document.createElement("p");
    let image = document.createElement("img");

    console.log(e);

    title.innerHTML = e.snippet.title;
    desc.innerHTML = e.snippet.description;
    image.setAttribute("src", e.snippet.thumbnails.high.url);
    video.addEventListener("click", () => {
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${e.id.videoId}`
      );
      iframe.classList.add("show-iframe");
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });

    video.append(image, title, desc);
    main.appendChild(video);
  });
}

function fetchVideos() {
  request.open("GET", url + input.value);

  request.send();

  request.onload = function () {
    // console.log(JSON.parse (request.responseText).items)
    createVideos(JSON.parse(request.responseText).items);
  };
}

btn.addEventListener("click", fetchVideos);
window.addEventListener("load", fetchVideos);
