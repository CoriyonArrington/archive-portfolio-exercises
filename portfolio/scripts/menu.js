let html = document.getElementById("html");
let contactMe = document.getElementById("contact-me");
let navOverlay = document.getElementById("nav-overlay");
let menuIcon = document.getElementById("menu-icon-container");

// this closes the mobile nav menu after clicking an anchor link and restores overflow
function anchorLink() {
  menuIcon.classList.toggle("change");
  navOverlay.classList.toggle("on");
  html.classList.remove("overflow-hidden");
}

// this opens and loses the mobile nav menu and prevents body scrolling
menuIcon.addEventListener("click", function () {
  menuIcon.classList.toggle("change");
  navOverlay.classList.toggle("on");
  navOverlay.appendChild(contactMe);
  html.classList.toggle("overflow-hidden");
});
