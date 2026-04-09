let firstNum = "";
let secondNum = "";
let operator = "";
let step = 1;
let isCalculated = false;
const display = document.querySelector('.current-input')
const sectionBtn = document.querySelectorAll('.btn-section')

// Button logic
sectionBtn.forEach(button => {
    button.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if(!button) return;
        
        const value = button.textContent;

        if (value === "C") {
            clear()
            return
        } else if (value === "-/+") {
            positiveNegative()
            return
        } else if (value === "%") {
            percentage()
            return
        }

        if (!isNaN(value)) {
            if (isCalculated === true) {
                clear()
                isCalculated = false
            }
            if (step === 1) {
                firstNum += value;
                display.textContent = firstNum;
            } else {
                secondNum += value;
                display.textContent = secondNum;
            }
        } else if (value != "=") {
            operator = value;
            step = 2;
            isCalculated = false
        } else {
            calculate();
        }
    });
});
// Main calculate logic function
function calculate(value) {
    let result = 0;
    let num1 = Number(firstNum);
    let num2 = Number(secondNum);

    if (!operator) return;
    if (operator === "+") result = num1 + num2;
    if (operator === "-") result = num1 - num2;
    if (operator === "*") result = num1 * num2;
    if (operator === "/") {
        result = num2 === 0 ? "ERROR" : num1 / num2;
    }

    if (result === "ERROR") {
        display.textContent = result;
    } else {
        display.textContent = Number(parseFloat(result).toFixed(3));
    }

    firstNum = result.toString();
    secondNum = "";
    step = 1;
    isCalculated = true
}
//Function to delete all from screen
function clear() {
    step = 1;
    firstNum = "";
    secondNum = "";
    operator = "";
    display.textContent = "";
}
// Positive or Negative function
function positiveNegative() {
    if (operator === "") {
        firstNum = (Number(firstNum) * -1).toString();
        display.textContent = firstNum;
    } else {
        secondNum = (Number(secondNum) * -1).toString();
        display.textContent = secondNum;
    }
};
// Percentage function
function percentage() {
    if (operator === "") {
        firstNum = (Number(firstNum) / 100).toString();
        display.textContent = firstNum;
    } else {
        secondNum = (Number(secondNum) / 100).toString();
        display.textContent = secondNum;
    }
};