const calculatorDisplay = document.querySelector(".calculator-display")

const buttonLabels = [
  'AC', '+/-', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

const keyMap = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  ".": ".",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "%": "%",
  "Enter": "=",
  "Backspace": "AC",
  "Escape": "AC",
};

let numberA = "";
let numberB = "";
let operator = null;
let currentInputState = "A";

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const buttonLabel = keyMap[key]
  
  if(buttonLabel) {
    const button = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent === buttonLabel
    );
    if(button) {
      button.click()
    }
  }
})

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
      handleButtonClick(label);
    })

    container.appendChild(button)
  })
};

function handleButtonClick(value) {
  if(!isNaN(parseInt(value)) || value === ".") {
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
    //Handle input of negative numbers
  } else if(value === "+/-") {
    if(currentInputState === "A") {
      if(value === "+/-" && numberA.includes("-")) {
        return;
      }
      numberA = "-" + numberA;
      calculatorDisplay.innerText = numberA;
    } else if(currentInputState === "B") {
      if(value === "+/-" && numberB.includes("-")) {
        return;
      }
      numberB = "-" + numberB;
      calculatorDisplay.innerText = numberB;
    }
  } else if(isOperator(value)) {
    if(numberA && !numberB) {
      operator = value;
      currentInputState = "B";
      calculatorDisplay.innerText = operator;
    } else if(numberA && numberB) {
      const result = operate(parseFloat(numberA), parseFloat(numberB), operator);
      numberA = result
      numberB = "";
      operator = value;
      currentInputState = "B";
      if(result.length > 8) {
        calculatorDisplay.innerText = parseFloat(result.toFixed(8));
      }
      calculatorDisplay.innerText = parseFloat(result.toFixed(8));
    }
  } else if(value === "=") {
    if(numberA && numberB && operator) {
      const result = operate(parseFloat(numberA), parseFloat(numberB), operator);
      if(typeof result === "string") {
        calculatorDisplay.innerText = result;
        return;
      }
      calculatorDisplay.innerText = parseFloat(result.toFixed(8));
      resetCalculator();
    } else if(numberA && numberB === "" && operator === "%") {
      const result = operate(parseFloat(numberA), null, operator);
      calculatorDisplay.innerText = parseFloat(result.toFixed(8));
      resetCalculator();
    }
  } else if(value === "AC") {
    resetCalculator();
    calculatorDisplay.innerText = 0;
  }
}

function isOperator(value) {
  return ["+", "-", "*", "/", "%"].includes(value);
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
  if(a === 0 && b === 0) {
    return "Sike";
  }
  return a / b;
};

function percentage(a, b) {
  if(b === null) {
    return a / 100;
  } else {
    return (a * b) / 100;
  }
}

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
  
    case "%":
      return percentage(numA, numB)
      break;
    
      default:
      break;
  }
};

generateBtns();
