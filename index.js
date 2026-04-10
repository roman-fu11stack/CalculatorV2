const display = document.querySelector('.display')

let currentInput = '0';
let previousInput = null;
let operator = null;
let shouldResetScreen = false;

//Button logic 
const buttons = document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (!isNaN(value)) {
            inputNumber(value);
        } else if (value === "C") {
            clear()
        } else if (value === "=") {
            calculate()
        } else if (value === ".") {
            addDot()
        } else if (value === "+/-"){
            positiveNegative()
        } else {
            inputOperator(value)
        }

        displayUpdate()
    });
});

//Input number 
function inputNumber(number) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }
};

//Input operator 
function inputOperator(op) {
    if(operator !== null) {
        calculate();
    } 
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
};

//Display update function 
function displayUpdate() {
    display.textContent = currentInput;
};

//Main calculate logic
function calculate() {
    if (operator === null || shouldResetScreen) return;

    const prevInp = Number(previousInput);
    const currInp = Number(currentInput);

    let result;

    if (operator === "+") result = prevInp + currInp;
    if (operator === "-") result = prevInp - currInp;
    if (operator === "X") result = prevInp * currInp;
    if (operator === "/") {
        result = currInp === 0 ? "ERROR" : prevInp / currInp;
    };

    if (result === "ERROR") {
        currentInput = result;
    } else {
        currentInput = Number.parseFloat(result.toFixed(3))
    }

    shouldResetScreen = true;
    operator = null;
    previousInput = null;
};

//Display clear function
function clear() {
    currentInput = '0';
    previousInput = null;
    operator = null;
};

// Add dot function
function addDot() {
    if (shouldResetScreen) {
        if (currentInput === "ERROR") {
            currentInput = "0."
        } else if (!currentInput.toString().includes(".")) {
            currentInput += ".";
        } 
        shouldResetScreen = false;
        return
    };

    if (!currentInput.toString().includes(".")) {
        currentInput += ".";
    }
};

//Positive - Negative
function positiveNegative() {
    currentInput = (Number(currentInput) * -1).toString();
    displayUpdate(); 
};



