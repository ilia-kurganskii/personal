import "./header.scss";
import throttle from "lodash/throttle";
const header = document.getElementById("header");

function onScroll() {
  if (header.offsetTop !== 0) {
    header.classList.add("shadow");
  } else {
    header.classList.remove("shadow");
  }
}

document.addEventListener("scroll", throttle(onScroll, 60));
