const result = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let firstOperand = 0;
let currentOperator = "";
let secondOperand = 0;
let isPreviousResult = false;
let enteringDecimal = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (isPreviousResult && !"+-*/=C".includes(button.textContent)) {
        result.value = button.textContent;
        isPreviousResult = false;
        firstOperand = button.textContent;
        return;
    }

    if (button.textContent === "=") {
        if (currentOperator === "") {
            return; 
        }
        else if (currentOperator === "/" && secondOperand === "0") {
            result.value = "Error: Division by zero";
        }
        else if (currentOperator !== "" && secondOperand === 0) {
            console.log(firstOperand);
            console.log(secondOperand);
            console.log(currentOperator);
            result.value = evaluateOperation(firstOperand, currentOperator, firstOperand);
        } 
        else {
            console.log(firstOperand);
            console.log(secondOperand);
            console.log(currentOperator);
            result.value = evaluateOperation(firstOperand, currentOperator, secondOperand);
        }

        isPreviousResult = true;
        firstOperand = result.value;
        currentOperator = "";
        secondOperand = 0;
    } else if (button.textContent === ".") {
        if (enteringDecimal) return; 
        enteringDecimal = true;
        if (currentOperator === "") {
            result.value = firstOperand + ".";
        } else {
            result.value = secondOperand + ".";
        } 
    } else if (button.textContent === "C") {
        currentOperator = "";
        firstOperand = 0;
        secondOperand = 0;
        result.value = firstOperand;
    } else if ("+-*/".includes(button.textContent)) {
        if (firstOperand !== 0) {
            currentOperator = button.textContent;
            isPreviousResult = false;
        }
    } else {
        if (currentOperator === "") {
            if (enteringDecimal) {
                firstOperand = parseFloat(firstOperand + "." + button.textContent);
                enteringDecimal = false;
            } else {
                firstOperand = firstOperand * 10 + parseInt(button.textContent);
            }
            result.value = firstOperand;
        } else { 
            if (enteringDecimal) {
                secondOperand = parseFloat(secondOperand + "." + button.textContent);
                enteringDecimal = false;
            } else {
                secondOperand = secondOperand * 10 + parseInt(button.textContent);
            }
            result.value = secondOperand;
        }
    }});
});

function evaluateOperation(operand1, operator, operand2) {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);

  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand2 !== 0 ? operand1 / operand2 : "Error: Division by zero";
    default:
      return "Error: Invalid operator";
  }
}