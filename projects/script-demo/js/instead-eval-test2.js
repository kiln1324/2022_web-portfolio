/* const number = [1, 2, 3, 4, 5]; */
const number = ["1", "2", "3", "4", "5"];
const operators = ["+", "*", "/", "+"];
console.log(`초기 숫자 : ${number}`);
console.log(`초기 배열 : ${operators}`);

const newNumArray = number.map((index) => parseFloat(index));
console.log(newNumArray);

function indexOfoperators() {
  multiply = operators.indexOf("*");
  division = operators.indexOf("/");
  add = operators.indexOf("+");
  subtraction = operators.indexOf("-");
}

//indexOfoperators();

function sliceOperatorArray(index, string) {
  index = operators.indexOf(string);
  if (index === -1) {
    return false;
  } else {
    operators.splice(index, 1);
    console.log(`잘라낸 연산자 배열 : ${operators}`);
    indexOfoperators();
  }
}
/* sliceOperatorArray(multiply, "*");
sliceOperatorArray(division, "/");
sliceOperatorArray(add, "+");
sliceOperatorArray(subtraction, "-"); */

function calculateNumberArray(index, string) {
  indexOfoperators();
  console.log(`인덱스번호 : ${index}`);
  console.log(`계산 배열 : ${number}`);
  countOfOperator = operators.filter((element) => string === element).length;

  for (let i = 0; i < countOfOperator; i++) {
    sliceOperatorArray(index, string);
    if (index === -1) {
      return false;
    } else {
      if (index !== -1) {
        switch (string) {
          case "*":
            number[index] *= number[index + 1];
            break;
          case "/":
            number[index] /= number[index + 1];
            break;
          case "+":
            number[index] += number[index + 1];
            break;
          case "-":
            number[index] -= number[index + 1];
            break;

          default:
            return false;
        }

        number.splice(index + 1, 1);
      }
    }
  }
}
/* calculateNumberArray(multiply, "*");
calculateNumberArray(division, "/");
calculateNumberArray(add, "+");
calculateNumberArray(subtraction, "-"); */
/* if()
  if (multiply) {
    number[multiply] = number[multiply] * number[multiply + 1];
    number.splice(multiply + 1, 1);
    operators.splice(operators[multiply], 1);
  } */
