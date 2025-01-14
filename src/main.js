const buttonLabels = [
  'AC', '+/-', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

function generateBtns() {
  const container = document.querySelector(".buttons-container");

  buttonLabels.forEach(label => {
    const button = document.createElement('button');
    button.textContent = label;

    if(label === "=") {
      button.classList.add("operator-button", "equal-button")
    } else if(!isNaN(parseInt(label))) {
      button.classList.add("num-button")
    } else if(
      label === "AC" || 
      label === "+/-" ||
      label === "%" ||
      label === "/") {
      button.classList.add("secondary-operator-button")
    }
      else if(isNaN(parseInt(label))){
      button.classList.add("operator-button")
    }

    container.appendChild(button)
  })
};

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
generateBtns();
