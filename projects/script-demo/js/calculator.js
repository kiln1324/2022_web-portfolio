const btnNumber = document.querySelectorAll(".num-pads button");
const btnOperator = document.querySelectorAll(".operators button");
const btnClear = document.querySelector(".clear");
const btnEnter = document.querySelector(".enter");
const btnDelite = document.querySelector(".delite");

const display = document.querySelector(".number");
const process = document.querySelector(".process");

const calculateNumber = []; //계산할 때 사용될 숫자를 담아둘 배열
const calculateOperators = [];
let arrayNum = 0; // 배열인덱스를 위한 변수
let primeProt = 0; //소수점입력 보호
let resultDone = 0;

/* const pushInDisplay = function (number) {
  display.textContent = number;
};
const pushInProcess = function (number) {
  process.textContent = number;
}; */

function pushInDisplay(number) {
  display.textContent = number;
}
function pushInProcess(number) {
  process.textContent = number;
}

function clearDisplay() {
  //계산기 초기화 함수
  pushInDisplay(0); //디스플레이 초기화
  pushInProcess(""); //과정 디스플레이 초기화
  calculateNumber.length = 0; //숫자 배열 초기화
  calculateOperators.length = 0; //연산자 배열 초기화
  primeProt = 0; //소수점 사용 가능
  arrayNum = 0; //배열 인덱스 변수 초기화
  resultDone = 0;
  console.dir(process);
}

function pushNumber(event) {
  //계산 할 숫자를 display에 push하는 함수

  if (resultDone === 1) clearDisplay();
  //만약 엔터를 눌러 결과값이 나왔다면 display 초기화

  const btnValue = event.target.value;
  //console.log(`btnValue값 : ${btnValue} // ${typeof btnValue}`);
  // 누른 버튼의 숫자값을 가져오는 함수 // 타입스트링

  let displayNow = display.textContent;
  //현재 디스플레이에 보이는 문자열가져오기

  if (btnValue === ".") {
    if (primeProt === 1) return false;
    primeProt = 1;
    //만약에 누른 버튼이 소수점이면....
    pushInDisplay(displayNow + btnValue);
  } else {
    //operlator 누르기전까지 배열에 숫자넣기
    //현재 디스플레이값 가져오기

    //이거로 쓰면 처음 콤마찍힐때마다 diplay 숫자가 리셋됨
    if (displayNow === "0") {
      //처음 숫자버튼을 누르면 이미 입력된 숫자 0 을 제외하고 누른 숫자값만 화면에 넣기
      calculateNumber[arrayNum] = btnValue;
      pushInDisplay(calculateNumber[arrayNum]);

      //console.log(`계산할 숫자 배열 : ${calculateNumber}`);
    } else {
      if (display.textContent.indexOf(".") === -1) {
        //만약 디스플레이에 소수점이 찍혀있지 않는다면~~
        //천단위 콤마찍기
        //단, 1이상의 숫자 소수 3자리 이하 잘림
        displayNow = display.textContent.replace(/,/g, "");
        calculateNumber[arrayNum] = displayNow + btnValue;

        pushInDisplay(
          parseFloat(calculateNumber[arrayNum]).toLocaleString("ko-KR")
        );
      } else {
        //이미 소수점이 display 문자열에 있을 경우
        calculateNumber[arrayNum] = displayNow + btnValue;
        pushInDisplay(calculateNumber[arrayNum]);
      }
    }
  }
  //console.log(`계산할 숫자 배열 : ${calculateNumber}`);
}

function pushOperator(event) {
  const btnValue = event.target.value;
  const displayNow = display.textContent;
  const processNow = process.textContent;

  if (resultDone === 1) {
    resultDone = 0;
    const previousValue = displayNow;
    console.dir(`클리어 전 : ${process.textContent}`);
    clearDisplay();
    console.dir(`클리어 후 : ${process.textContent}`);
    //????????대체 왜 과정창이 리셋이 안되는가:????
    pushInProcess(previousValue);
    calculateNumber[arrayNum] = displayNow;
    console.dir(`클리어 후 추가값 : ${process.textContent}`);
  }

  if (processNow === "" && displayNow === "0") return false;
  if (displayNow === "0") {
    //이미 입력된 연산자 바꾸기
    calculateOperators[arrayNum] = btnValue;
    const lastStr = processNow.charAt(processNow.length - 1);

    pushInProcess(processNow.replace(lastStr, btnValue));
  } else {
    //새로 연산자를 입력할때
    pushInProcess(processNow + displayNow + btnValue);
    pushInDisplay(0);
    calculateOperators[arrayNum] = btnValue;

    if (calculateNumber.length >= 1) arrayNum++;
    // 직전에 연산자버튼을 눌러 이미 배열에 들어갔으나 수정 >> 배열숫자가 더해지면 안됨
    // 새 숫자를 입력하고 그다음 연산자를 추가 >> 배열숫자가 더해져야함
  }
  //console.log(`연산자 배열 : ${calculateOperators}`);
}

function doCalculate(countOfNumber) {
  for (let i = 0; i < countOfNumber; i++) {
    let nexti = i + 1;
    calculateNumber[nexti] =
      calculateNumber[i] + calculateOperators[i] + calculateNumber[nexti];
    //console.log(`배열 : ${calculateNumber[i]}, ${calculateNumber[nexti]}`);
  }
  //console.log(`계산값 : ${eval(calculateNumber[countOfNumber - 1])}`);
  return eval(calculateNumber[countOfNumber - 1]);
}
function getResult() {
  pushInProcess(
    process.textContent + calculateNumber[calculateNumber.length - 1] + " = "
  );
  const countOfNumber = calculateNumber.length;
  if (countOfNumber === 1) {
    resultDone = 1;
    return false;
  } else {
    pushInDisplay(doCalculate(countOfNumber));
    resultDone = 1;
  }
}

function deliteNumber() {
  //display 숫자 하나씩 지우기
  if (display.textContent === "0") return false;

  const lastNum = calculateNumber[arrayNum].substr(-1);
  calculateNumber[arrayNum] = calculateNumber[arrayNum].replace(lastNum, "");

  display.textContent =
    calculateNumber[arrayNum] == ""
      ? 0
      : parseInt(calculateNumber[arrayNum]).toLocaleString("ko-KR");
}

function eventHandler() {
  for (let i = 0; i < btnNumber.length; i++) {
    btnNumber[i].addEventListener("click", pushNumber);
  }

  for (let i = 0; i < btnOperator.length; i++) {
    btnOperator[i].addEventListener("click", pushOperator);
  }

  btnClear.addEventListener("click", clearDisplay);
  btnEnter.addEventListener("click", getResult);
  btnDelite.addEventListener("click", deliteNumber);
}

eventHandler();

//콤마찍기 테스트
/* let onetwo = parseFloat(34.986645454546);
let onetwo2 = 1233334;

const a = onetwo.toLocaleString("ko-KR");
const b = onetwo2.toLocaleString("ko-KR");
console.log(`${a}//${b} // ${onetwo}`);
 */
