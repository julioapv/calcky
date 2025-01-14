const calculatorDisplay = document.querySelector(".calculator-display")

const buttonLabels = [
  'AC', '+/-', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

let numberA = "";
let numberB = "";
let operator = null;
let currentInputState = "A"; // To help us track in what part of the of the process we're in ("A", "OPERATOR", "B")

function generateBtns() {
  const container = document.querySelector(".buttons-container");

  buttonLabels.forEach(label => {
    const button = document.createElement('button');
    button.textContent = label;

    if(label === "=") {
      button.classList.add("operator-button", "equal-button");
    } else if(!isNaN(parseInt(label))) {
      button.classList.add("num-button")
    } else if(["AC", "+/-", "%", "/"].includes(label)) {
      button.classList.add("secondary-operator-button", "operator-button")
    } else if(isNaN(parseInt(label))){
      button.classList.add("operator-button")
    }

    button.addEventListener("click", () => {
      handleButtonClick(label, button);
    })

    container.appendChild(button)
  })
};

function handleButtonClick(value) {
  if (!isNaN(parseInt(value)) || value === ".") {
    //Handle number or decimal input
    if(currentInputState === "A") {
      if(value === "." && numberA.includes(".")) {
        return;
      }
      numberA += value;
      calculatorDisplay.innerText = numberA;
    } else if(currentInputState === "B") {
      if(value === "." && numberB.includes(".")) {
        return;
      }
      numberB += value;
      calculatorDisplay.innerText = numberB;
    }
  } else if(isOperator(value)) {
    if(numberA && !numberB) {
      operator = value;
      currentInputState = "B";
      calculatorDisplay.innerText = operator;
    }
  } else if(value === "=") {
    if(numberA && numberB && operator) {
      const result = operate(parseFloat(numberA), parseFloat(numberB), operator);
      calculatorDisplay.innerText = result;
      resetCalculator();
    }
  } else if(value === "AC") {
    resetCalculator();
    calculatorDisplay.innerText = 0;
  }
}

function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
};

function resetCalculator() {
  numberA = "";
  numberB = "";
  operator = null;
  currentInputState = "A";
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

function operate(numA, numB, operator) {

  switch (operator) {
    case "+":
      return add(numA, numB)
      break;
  
    case "-":
      return substract(numA, numB)
      break;

    case "*":
      return multiply(numA, numB)
      break;

    case "/":
      return divide(numA, numB)
      break;
  
      default:
      break;
  }
};

generateBtns();
