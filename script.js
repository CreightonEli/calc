// constants // 
// theme toggle
const toggleBtn = document.getElementById("toggle-btn");
const toggleSwitch = document.getElementById("toggle-switch");
// calc elements
const screenNum = document.getElementById("screen-num");

// variables //
let numbers = [];
let operators = [];
let displayString = "0";

// functions //
function display() {screenNum.innerText = displayString;}

function concat(input) {
    displayString = String(displayString)
    if (displayString === "0" && input === ".") {}
    else if (displayString === "0") {
        displayString = "";
    }
    displayString += input;
    display();
}

function add() {
    numbers.push(Number(displayString));
    operators.push("+");
    displayString = "0";
    display();
}

function sub() {
    numbers.push(Number(displayString));
    operators.push("-");
    displayString = "0";
    display();
}

function mult() {
    numbers.push(Number(displayString));
    operators.push("*");
    displayString = "0";
    display();
}

function div() {
    numbers.push(Number(displayString));
    operators.push("/");
    displayString = "0";
    display();
}

function equal() {
    numbers.push(Number(displayString));
    for (var i = 0; i < operators.length; i++) {
        let op = operators[i];
        switch (op) {
            case "+":
                displayString = numbers[i] + numbers[i + 1];
                numbers[i + 1] = displayString;
                break;
            case "-":
                displayString = numbers[i] - numbers[i + 1];
                numbers[i + 1] = displayString;
                break;
            case "*":
                displayString = numbers[i] * numbers[i + 1];
                numbers[i + 1] = displayString;
                break;
            case "/":
                displayString = numbers[i] / numbers[i + 1];
                if (numbers[i] === 0 && numbers[i + 1] === 0) {
                    displayString = "0";
                }
                else {
                    numbers[i + 1] = displayString;
                }
        }
    }
    display();
    numbers = [];
    operators = [];
}

function reset() {
    numbers = [];
    operators = [];
    displayString = "0";
    display();
}

function del() {
    if (displayString === "0") {}
    else {
        displayString = String(displayString);
        displayString = displayString.slice(0, -1);
        display();
    }
}

// document.addEventListener(KeyboardEvent)