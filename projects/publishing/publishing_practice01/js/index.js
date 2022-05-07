"use strict";

/* ------------- 변수 */

const reviewList = $(".review_list-wrap .list ul");

let prot = 0; //headerDown protact

let btnProt = 0; //fnq btn protact

let listLiWidth = reviewList.find("li").outerWidth();

const aBoxHeight = "";

/*------------  js 초기 세팅  ---------------*/
$("a").click(function (event) {
  event.preventDefault();
});

$(".main_text-box").css({
  left: "-50%",
  opacity: 0,
});

$(".main_img-box").css({
  opacity: 0,
});

$("#news ul li").css({
  top: "-100px",
  opacity: 0,
});

$("#recomend").prepend('<div class="show-box"></div>');
$("#recomend").prepend(
  '<div class="airplain"><img src="img/ico_airplane.png"></div>'
);

$(".recomend_top-box").css({
  background: "none",
});

$(".recomend_bottom-box>div").css({
  top: "-60px",
  opacity: 0,
});

$(".magazine_txt-wrap").css({
  position: "relative",
  left: "-60px",
  opacity: 0,
});

$(".magazine_img-box").css({
  position: "relative",
  right: "-60px",
  opacity: 0,
});

reviewList.prepend(reviewList.find("li:last"));

/*------------  //js 초기 세팅  ---------------*/

/* ------------menu */

$(".menu-toggle").click(function () {
  $(this).siblings("ul").slideToggle(600);
});

/* ------------//menu */

$(".main_text-box").delay(400).animate(
  {
    left: 0,
    opacity: 1,
  },
  1200
);

$(".main_img-box").delay(400).fadeTo(2000, 1);

function headerDown(value) {
  if (value > 80) {
    if (prot == 1) return false;
    prot = 1;
    $("header")
      .stop(true)
      .animate(
        {
          height: "100px",
        },
        600
      )
      .css("border-bottom", "1px solid #dad7d7");
  }

  if (value < 80) {
    $("header")
      .stop(true)
      .animate(
        {
          height: "180px",
        },
        600
      )
      .css("border-bottom", "none");

    prot = 0;
  }
}

function newsDown(value) {
  const newsOffset = $("#news").offset().top;
  if (value > newsOffset - 400) {
    let i = 0;
    let liDown = setInterval(function () {
      $("#news ul li").eq(i).animate(
        {
          top: 0,
          opacity: 1,
        },
        600
      );
      i++;
    }, 400);
    if (i > $("#news ul li").length) clearInterval(liDown);
  }
}

function moveAirplain(value) {
  const recomendOffset = $("#recomend").offset().top;
  if (value > recomendOffset - 300) {
    $(".airplain").css({
      top: "230px",
    });

    $(".show-box").animate(
      {
        height: 0,
      },
      800
    );

    setTimeout(function () {
      $(".airplain").css({
        height: "74px",
      });
    }, 400);
  }
}

function recomendImgShow(value) {
  const imgOffset = $(".recomend_bottom-box").offset().top;
  if (value > imgOffset - 100) {
    $(".recomend_bottom-box").find(".left-box").css({
      top: 0,
      opacity: 1,
    });

    setTimeout(function () {
      $(".recomend_bottom-box").find(".right-box").animate(
        {
          top: 0,
          opacity: 1,
        },
        1200
      );
    }, 200);
  }
}

function magazineShow(value) {
  const magazineOffset = $("#magazine").offset().top;
  if (value > magazineOffset - 200) {
    $(".magazine_txt-wrap").animate(
      {
        left: 0,
        opacity: 1,
      },
      1000
    );

    $(".magazine_img-box").animate(
      {
        right: 0,
        opacity: 1,
      },
      1000
    );
  }
}

function scrollEvent() {
  const winY = window.scrollY;
  headerDown(winY);
  newsDown(winY);
  moveAirplain(winY);
  recomendImgShow(winY);
  magazineShow(winY);
}

window.addEventListener("scroll", scrollEvent);

/* -------------- .fnq more ----------- */

$("#fnq li").click(function () {
  $(this).toggleClass("active").siblings().removeClass("active");
});
/* -------------- //.fnq more ----------- */

/* -------------- .review slide ----------- */

reviewList.css({
  position: "relative",
  left: -listLiWidth,
});

window.addEventListener("resize", function () {
  listLiWidth = reviewList.find("li").outerWidth();
  reviewList.css({
    position: "relative",
    left: -listLiWidth,
  });
});

$(".btn-grp button").click(function () {
  let btnI = $(this).index();
  console.log(btnI);
  //if (btnProt == 1) return false;
  btnProt = 1;
  if (btnI) {
    reviewList.animate(
      {
        left: 0,
      },
      400,
      function () {
        reviewList.prepend(reviewList.find("li:last"));
        reviewList.css({
          left: -listLiWidth,
        });
      }
    );
  } else {
    reviewList.animate(
      {
        left: -(listLiWidth * 2),
      },
      400,
      function () {
        reviewList.append(reviewList.find("li:first"));
        reviewList.css({
          left: -listLiWidth,
        });
      }
    );
  } //else
});
/* -------------- //.review slide ----------- */

/* -------------- footer logo ----------- */
const logo = document.querySelector(".footer_logo");
logo.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
