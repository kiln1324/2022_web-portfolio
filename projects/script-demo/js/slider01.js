"use stric";

const countLi = $(".slider_wrap ul li").length;
let liW = parseInt($(".slider_wrap ul li").eq(0).css("width"));
const ACTIVE_CLASSNAME = "active";
let list_zIndex = countLi;

console.log(countLi);
/* --------------------------준비하기 */
function organazeLi() {
  for (let i = countLi - 1; i >= 0; i--) {
    $(".slider_wrap ul li")
      .eq(i)
      .css({
        zIndex: countLi - i,
      });
  }
}

organazeLi();

$(".slider_wrap ul").prepend($(".slider_wrap ul li:last"));
$(".slider_wrap ul").css({
  left: `-${liW}px`,
});

window.addEventListener("resize", function () {
  liW = parseInt($(".slider_wrap ul li").eq(0).css("width"));
  $(".slider_wrap ul").css({
    left: `-${liW}px`,
  });
  console.log(`크기변경중.... /// ${liW}`);
});

let prot = 0;
/* --------------------------//준비하기 */

function slider() {
  if (prot === 1) return false;
  prot = 1;

  let indexNum = $(".btns").index(this);

  if (indexNum === 0) {
    console.log("오른쪽");
    $(".slider_wrap ul li").eq(0).find(".img-box").css({
      transform: "translate(2vw)",
    });
    $(".slider_wrap ul li").eq(1).find(".img-box").css({
      transform: "translate(-8vw)",
    });
    $(".slider_wrap ul li").eq(2).find(".img-box").css({
      transform: "translate(-18vw)",
    });
    $(".slider_wrap ul li").eq(3).find(".img-box").css({
      transform: "translate(2vw)",
    });
    $(".slider_wrap ul li:last").find(".img-box").css({
      transform: "translate(-18vw)",
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
  } else {
    console.log("왼쪽");
    $(".slider_wrap ul li").eq(1).find(".img-box").css({
      transform: "translate(-18vw)",
    });
    $(".slider_wrap ul li").eq(2).find(".img-box").css({
      transform: "translate(2vw)",
    });
    $(".slider_wrap ul li").eq(3).find(".img-box").css({
      transform: "translate(-8vw)",
    });
    $(".slider_wrap ul li").eq(4).find(".img-box").css({
      transform: "translate(-18vw)",
    });
    $(".slider_wrap ul li:last").find(".img-box").css({
      transform: "translate(2vw)",
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
  }

  organazeLi();
} // fnc

$(".btns").click(slider); //click
/* -----------------animation-test----------------------------- */

/* --------------------canvas */
