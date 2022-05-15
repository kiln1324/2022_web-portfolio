"use strick";

const skillCard = document.querySelectorAll(".skill-card");
const btnEmail = document.querySelectorAll(".copyEmail");
const alertBox = document.getElementById("alertBox");

function toggleSkillCard(evnet) {
  evnet.preventDefault();
  Array.from(skillCard).indexOf(this);
  skillCard.forEach((all) => {
    all.classList.remove(CLASSNAME_ACTIVE);
  });
  this.classList.add(CLASSNAME_ACTIVE);
}

function copyEmail(evnet) {
  evnet.preventDefault();
  const addressEmail = this.getAttribute("href");
  console.log(addressEmail);

  navigator.clipboard.writeText(addressEmail);

  alertBox.classList.add(CLASSNAME_ACTIVE);
  setTimeout(() => {
    alertBox.classList.remove(CLASSNAME_ACTIVE);
  }, 3000);
}

skillCard.forEach((list) => {
  list.addEventListener("click", toggleSkillCard);
});

btnEmail.forEach((list) => {
  list.addEventListener("click", copyEmail);
});
