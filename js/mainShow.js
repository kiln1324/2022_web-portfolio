"use strick";

const logo = document.getElementById("logo");
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const main = document.getElementById("main");

let winY = window.scrollY;

window.addEventListener("scroll", function () {
  winY = window.scrollY;
});

if (winY < 120) {
  logo.style.animation = "returnlogo 0.8s ease-in-out 1.8s forwards";
  menu.style.animation = "changeopacity 0.8s ease-in-out 2s forwards";
  menuBtn.style.animation = "changeopacity 0.8s ease-in-out 2s forwards";
  main.style.animation = "changeopacity 0.8s ease-in-out 2.2s forwards";
} else {
  logo.style.transform = "none";
  menu.style.opacity = 1;
  menuBtn.style.opacity = 1;
  main.style.opacity = 1;
}
