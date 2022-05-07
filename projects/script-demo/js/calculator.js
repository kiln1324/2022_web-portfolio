const btnNumber = document.querySelectorAll(".num-pad");
const btnOperator = document.querySelectorAll(".operators button");

const btnDot = document.querySelector(".dot-pad");
const btnClear = document.querySelector(".clear");
const btnEnter = document.querySelector(".enter");
const btnDelite = document.querySelector(".delite");

const display = document.querySelector(".number");
const process = document.querySelector(".process");

const calculateNumber = []; //계산할 때 사용될 숫자를 담아둘 배열
const calculateOperators = [];
let arrayNum = 0, //배열인덱스를 위한 변수
  prevResult = 0, // 이전 결과값 저장
  displayNow, //현재 디스플레이값 저장
  processNow; // 현재 과정창값 저장

//현재 디스플레이값 재정의
const reDefineDisplay = function () {
  displayNow = display.innerText;
};

//현재 과정값 재정의
const reDefineProcess = function () {
  processNow = process.innerText;
};

//디스플레이에 값을 넘기는 함수
const pushInDisplay = function (number) {
  display.innerText = number;
};

// 과정창에 값을 넘기는 함수
const pushInProcess = function (number) {
  process.innerText = number;
};

//초기화 함수
function clearDisplay() {
  //계산기 초기화 함수
  pushInDisplay(0); //디스플레이 초기화
  pushInProcess(""); //과정 디스플레이 초기화
  calculateNumber.length = 0; //숫자 배열 초기화
  calculateOperators.length = 0; //연산자 배열 초기화
  primeProt = 0; //소수점 사용 가능
  arrayNum = 0; //배열 인덱스 변수 초기화

  /* console.log(`리셋 디스플레이값 : ${display.innerText}`);
  console.log(`리셋 과정창값 : ${process.innerText}`);
  console.log(`리셋 숫자배열 : ${calculateNumber}`);
  console.log(`리셋 연산자배열 : ${calculateOperators}`);
  console.log(`리셋 배열인덱스 : ${arrayNum}`);
  console.log(`결과값 : ${prevResult}`);
  console.log(`--------------------------------`); */
}

// 소수점 추가 함수
function pushDot() {
  reDefineDisplay();
  if (displayNow === "0") {
    pushInDisplay("0.");
  } else {
    if (displayNow.indexOf(".") === -1) {
      //만약 디스플레이에 소수점이 찍혀있지 않는다면~~
      pushInDisplay(displayNow + ".");
    } else {
      //이미 소수점이 찍힘
      return false;
    }
  }
}

//계산 할 숫자를 display에 push하는 함수
function pushNumber(event) {
  //만약 이전 결과값이 있다면 display 초기화

  if (prevResult) {
    clearDisplay();
    prevResult = 0;
  }

  reDefineDisplay(); //현재디스플레이값 재정의
  reDefineProcess(); //현재 과정값 재정의
  const btnValue = event.target.value;
  // 누른 버튼의 숫자값 >> 타입 = 스트링

  if (displayNow === "0") {
    displayNow = btnValue;
    pushInDisplay(displayNow);
  } else {
    //디스플레이 값이 0이 아님

    if (!displayNow.includes(".")) {
      //만약 디스플레이에 소수점이 찍혀있지 않는다면~~

      displayNow = displayNow + btnValue;

      displayNow = displayNow.replace(/,/g, "");
      pushInDisplay(parseFloat(displayNow).toLocaleString("ko-KR"));
    } else {
      //소수점이면
      displayNow = displayNow + btnValue;
      pushInDisplay(displayNow);
    }
  }
  calculateNumber[arrayNum] = displayNow;
}

function pushOperator(event) {
  //const btnValue = event.target.value;
  const btnValue = event.target.value;

  reDefineDisplay(); //현재디스플레이값 재정의
  reDefineProcess(); //현재 과정값 재정의

  if (processNow === "" && displayNow === "0") return false;
  //아무것도 없는 상태에서는 연산자를 눌러도 반응이 없도록
  pushInDisplay(0);
  if (processNow === "") {
    //연산자 처음 입력
    pushInProcess(displayNow + btnValue);
    calculateOperators[arrayNum] = btnValue;
    arrayNum++;
    //console.log(`첫 연산자 입력 : ${processNow}`);
    // 무조건 0번에 연산자 저장됨
  } else {
    if (displayNow === "0") {
      //연산자 바꾸기

      //let lastStr = processNow.charAt(processNow.length - 1); //만약 식내에 연산자가 두개이상이고 같은 연산자가 있다면 끝자리가 바뀌는 게 아니라 추출한 연산자중 왼쪽에서 첫번째 연산자가 바뀜
      calculateOperators[arrayNum - 1] = btnValue;
      pushInProcess(processNow.substring(0, processNow.length - 1) + btnValue);
    } else {
      //연산자 추가
      if (prevResult || processNow.substr(-1) === "=") {
        clearDisplay();
        pushInProcess(prevResult + btnValue);
        calculateNumber[arrayNum] = prevResult;
        prevResult = 0;
        calculateOperators[arrayNum] = btnValue;
        arrayNum++;
      } else {
        calculateOperators[arrayNum] = btnValue;
        pushInProcess(processNow + displayNow + btnValue);
      }
    }
  }

  /* console.log(
    `연산자버튼 누른 후 배열 : ${calculateOperators}, 누른 버튼 : ${btnValue}, 배열 인덱스 : ${arrayNum}`
  ); */
}

function doCalculate(countOfNumber) {
  for (let i = 0; i < countOfNumber - 1; i++) {
    let nexti = i + 1;
    prevResult =
      calculateNumber[i] + calculateOperators[i] + calculateNumber[nexti];
  }
  prevResult = eval(prevResult);
  return prevResult;
}

function getResult() {
  //결과값내기
  const countOfNumber = calculateNumber.length; // 숫자배열 길이
  //console.log(countOfNumber);
  reDefineDisplay();
  reDefineProcess();
  if (countOfNumber === 1) {
    return false;
  } else {
    pushInProcess(processNow + displayNow + " = ");

    pushInDisplay(doCalculate(countOfNumber));
    //디스플레이에 prevResult 넣기
  }
}

function deliteNumber() {
  //display 숫자 하나씩 지우기
  reDefineDisplay();
  reDefineProcess();

  if (displayNow === "0") return false;

  const lastNum = displayNow.substring(0, displayNow.length - 1);
  calculateNumber[arrayNum] = lastNum;

  pushInDisplay(lastNum == "" ? 0 : lastNum);
}

function eventHandler() {
  for (let i = 0; i < btnNumber.length; i++) {
    btnNumber[i].addEventListener("click", pushNumber);
  }

  for (let i = 0; i < btnOperator.length; i++) {
    btnOperator[i].addEventListener("click", pushOperator);
  }
  btnDot.addEventListener("click", pushDot);
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
