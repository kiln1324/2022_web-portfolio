"use strick";
function stopDefaulEvent(event) {
  event.preventDefault();
  console.log("송신중");
}
window.addEventListener("scroll", stopDefaulEvent);
//window.addEventListener("touchmove", stopDefaulEvent);
//window.addEventListener("mousewheel", stopDefaulEvent);

setTimeout(() => {
  window.removeEventListener("scroll", stopDefaulEvent);
  //window.removeEventListener("touchmove", stopDefaulEvent);
  //window.removeEventListener("mousewheel", stopDefaulEvent);
}, 3000);
