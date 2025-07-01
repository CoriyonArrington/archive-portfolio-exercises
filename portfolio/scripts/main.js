// this hides and shows the nav
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let scrollPos = 0;
let scrollTimer = -5;

// this hides and shows the nav bar while scrolling
function checkPosition() {
  let windowY = window.pageYOffset;
  let mainNav = document.getElementById("main-nav");

  if (windowY <= 0) {
    // Scroll is at the top
    mainNav.classList.remove("is-hidden");
    mainNav.classList.add("is-visible");
    mainNav.classList.remove("is-filled");
    mainNav.classList.add("is-transparent");
  } // Scrolling UP
  else if (windowY <= scrollPos) {
    mainNav.classList.remove("is-hidden");
    mainNav.classList.add("is-visible");
    mainNav.classList.add("is-filled");
    mainNav.classList.remove("is-transparent");
  } else {
    // Scrolling DOWN
    mainNav.classList.add("is-hidden");
    mainNav.classList.remove("is-visible");
    mainNav.classList.add("is-filled");
    mainNav.classList.remove("is-transparent");
  }

  scrollPos = windowY;
}

window.addEventListener("scroll", debounce(checkPosition));
