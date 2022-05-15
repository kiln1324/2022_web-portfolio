"use strick";

/* ------------------------------------------------------변수 */
const publishing = document.getElementById("publishing");
const script = document.getElementById("script");
const about = document.getElementById("about");

const mainBtn = document.querySelector(".go-works-btn");
const gnb = document.getElementById("gnb");
const gnbMenu = gnb.querySelectorAll("li");
const locateSections = [];
const rangeMin = [];
const rangeMax = [];

const publishingLocate = publishing.offsetTop;
const scriptLocate = script.offsetTop;
const aboutLocate = about.offsetTop;

const CLASSNAME_ACTIVE = "active";
/* ------------------------------------------------------//변수 */

/* ------------------------------------------------------함수 */
for (let i = 0; i < gnbMenu.length; i++) {
  const dataName = gnbMenu[i].querySelector("a").getAttribute("data-txt");

  const selectContent = document.getElementById(dataName);

  locateSections[i] = dataName === "intro" ? 0 : selectContent.offsetTop;
}

function scrollSmooth(locate) {
  window.scrollTo({ top: locate, behavior: "smooth" });
}

function toggleMenuStyle(target) {
  gnbMenu.forEach((all) => {
    all.classList.remove(CLASSNAME_ACTIVE);
  });
  target.classList.add(CLASSNAME_ACTIVE);
}

function moveToMenu(event) {
  event.preventDefault();
  const indexNum = Array.from(gnbMenu).indexOf(this);
  toggleMenuStyle(this);
  window.scrollTo({ top: locateSections[indexNum], behavior: "smooth" });
}

function scrollMenuChange() {
  let evt = window.event || e;

  let delta = evt.detail ? evt.detail : evt.wheelDelta;
  /*console.log('마우스휠 델타값 : ' + delta);*/

  if (/Firefox/i.test(navigator.userAgent)) {
    delta = -evt.orginalEvent.detail;
  }

  let winY = window.scrollY;

  for (let i = 0; i < locateSections.length; i++) {
    rangeMin[i] = locateSections[i] - 200;
    rangeMax[i] = locateSections[i] + 200;
  }

  let menuIndex = 0;
  if (delta > 0) {
    //양수 - 윗방향
    if (winY < rangeMax[0]) menuIndex = 0;
    if (winY < rangeMax[1]) menuIndex = 1;
    if (winY < rangeMax[2]) menuIndex = 2;
    if (winY < rangeMax[3]) menuIndex = 3;
  } else {
    //delta<0, 음수 - 아랫방향
    if (winY > rangeMin[0]) menuIndex = 0;
    if (winY > rangeMin[1]) menuIndex = 1;
    if (winY > rangeMin[2]) menuIndex = 2;
    if (winY > rangeMin[3]) menuIndex = 3;
  }

  toggleMenuStyle(gnbMenu[menuIndex]);
}

/* ------------------------------------------------------//함수 */

/* ------------------------------------------------------이벤트핸들러 */

mainBtn.addEventListener("click", () => scrollSmooth(publishingLocate));
gnbMenu.forEach((link) => {
  link.addEventListener("click", moveToMenu);
});

window.addEventListener("scroll", scrollMenuChange);
/* ------------------------------------------------------//이벤트핸들러 */
/* const mainBtn = document.querySelector(".go-works-btn");
const gnb = document.getElementById("gnb");
const gnbMenu = gnb.querySelectorAll("li a");
const menuValue = [];
let winScrollY = 0;

function getScrollY() {
  winScrollY = window.scrollY;
}
function changeMenu() {}
changeMenu();

function getMenuLocate() {
  for (let i = 0; i < gnbMenu.length; i++) {
    menuValue[i] = gnb[i].getAttribute("data-txt");
  }
  const selectContent = document.getElementById(linkValue);
  const getLocate = linkValue === "intro" ? 0 : selectContent.offsetTop;

  window.scrollTo({ top: getLocate, behavior: "smooth" });
}
changeMenu(); */
/* function getMenuLocate(e) {
  e.preventDefault();
  const linkValue = this.getAttribute("data-txt");
  const selectContent = document.getElementById(linkValue);
  const getLocate = linkValue === "intro" ? 0 : selectContent.offsetTop;

  window.scrollTo({ top: getLocate, behavior: "smooth" });
}  */
/* 
window.addEventListener("scroll", getScrollY);
gnbMenu.forEach((menu) => {
  menu.addEventListener("click", moveMenu);
});
mainBtn.addEventListener("click", moveMenu);
 */
/* 
const toInfo = document.querySelectorAll(".to-info");

function moveToSmooth(e) {
  e.preventDefault();
  e.returnValue = "";
  const linkTo = this.getAttribute("href");
  document.body.animate(
    {
      opacity: [1, 0],
    },
    { duration: 1000, iterations: 1 }
  );

  setTimeout(() => {
    location.replace(linkTo);
  }, 1000);
}

toInfo.forEach((link) => {
  link.addEventListener("click", moveToSmooth);
});
 */
