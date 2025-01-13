function add(a, b) {
  return a + b;
};

function substract(a, b) {
  return a - b
};

function multiply(a, b) {
  return a * b
};

function divide(a, b) {
  return a / b
};

let numberA;
let NumberB;
let operator;

function operate(numA, numB, operator) {
  switch (operator) {
    case "add":
      return add(numA, numB)
      break;
  
    case "substract":
      return substract(numA, numB)
      break;

    case "multiply":
      return multiply(numA, numB)
      break;

    case "divide":
      return divide(numA, numB)
      break;
  
      default:
      break;
  }
};

console.log(operate(10, 3, "multiply"));

