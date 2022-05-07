"use stric";

const countLi = $("slider_wrap ul li").length;
const liW = parseInt($(".slider_wrap ul li").eq(0).css("width"));
const ACTIVE_CLASSNAME = "active";
console.log(liW);

function organazeLi() {
  for (let i = 0; i < countLi; i++) {
    $(".slider_wrap ul li")
      .eq(i)
      .css({
        zIndex: `1${-i + countLi}`,
      });
  }
}

organazeLi();

/* --------------------------준비하기 */
$(".slider_wrap ul").prepend($(".slider_wrap ul li:last"));
$(".slider_wrap ul").css({
  left: `-${liW}px`,
});
let prot = 0;
/* --------------------------//준비하기 */

function slider() {
  if (prot === 1) return false;
  prot = 1;

  let indexNum = $(".btn-grp button").index(this);

  if (indexNum === 0) {
    console.log("왼쪽");
    $(".slider_wrap ul li").eq(1).find(".img-box").css({
      transform: "translate(-200px)",
    });
    $(".slider_wrap ul li").eq(2).find(".img-box").css({
      transform: "translate(0)",
    });
    $(".slider_wrap ul li").eq(3).find(".img-box").css({
      transform: "translate(-100px)",
    });
    $(".slider_wrap ul li").eq(4).find(".img-box").css({
      transform: "translate(-200px)",
    });
    $(".slider_wrap ul li:last").find(".img-box").css({
      transform: "translate(0)",
    });

    $(".slider_wrap ul li")
      .eq(2)
      .addClass(ACTIVE_CLASSNAME)
      .siblings()
      .removeClass(ACTIVE_CLASSNAME);

    setTimeout(() => {
      $(".slider_wrap ul").animate(
        {
          left: `-${liW * 2}px`,
        },
        800,
        function () {
          $(".slider_wrap ul").append($(".slider_wrap ul li:first"));

          $(".slider_wrap ul").css({
            //left: -380,
            left: `-${liW}px`,
          });
          prot = 0;
        }
      );
    }, 10);
  } else {
    console.log("오른쪽");
    $(".slider_wrap ul li").eq(0).find(".img-box").css({
      transform: "translate(0)",
    });
    $(".slider_wrap ul li").eq(1).find(".img-box").css({
      transform: "translate(-100px)",
    });
    $(".slider_wrap ul li").eq(2).find(".img-box").css({
      transform: "translate(-200px)",
    });
    $(".slider_wrap ul li").eq(3).find(".img-box").css({
      transform: "translate(0)",
    });
    $(".slider_wrap ul li:last").find(".img-box").css({
      transform: "translate(-200px)",
    });

    $(".slider_wrap ul li")
      .eq(0)
      .addClass(ACTIVE_CLASSNAME)
      .siblings()
      .removeClass(ACTIVE_CLASSNAME);

    setTimeout(() => {
      $(".slider_wrap ul").animate(
        {
          left: 0,
        },
        800,
        function () {
          $(".slider_wrap ul").prepend($(".slider_wrap ul li:last"));

          $(".slider_wrap ul").css({
            //left: -380,
            left: `-${liW}px`,
          });
          prot = 0;
        }
      );
    }, 10);
  }

  organazeLi();
} // fnc

$(".btn-grp button").click(slider); //click
/* -----------------animation-test----------------------------- */

/* --------------------canvas */
