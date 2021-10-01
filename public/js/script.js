// This script.js contains the functions that can be applied to each and every page //
/////////////////////////////////
// NAVBAR CLICK FUNCTIONALITY //
////////////////////////////////
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
burger.addEventListener("click", function () {
  nav.classList.toggle("nav-active");
  burger.classList.toggle("toggle");
});
