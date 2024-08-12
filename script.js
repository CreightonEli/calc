// constants // 
// theme toggle
const rootEl = document.querySelector("html")
const toggleBtn = document.getElementById("toggle-btn");
const toggleSwitch = document.getElementById("toggle-switch");
// calc elements
const screenNum = document.getElementById("screen-num");

// variables //
let numbers = [];
let operators = [];
let displayString = "0";
let decimal = false;
let theme = localStorage.getItem('colorTheme');

// functions //

// theme switcher
function switchTheme() {
    switch (theme) {
        case 'theme-1':
            theme = 'theme-2';
            break;
        case 'theme-2':
            theme = 'theme-3';
            break;
        case 'theme-3':
            theme = 'theme-1';
            break;
        default:
            theme = 'theme-2';
    }
    
    localStorage.setItem('colorTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}
            
// calculator
function display() {
    displayString = displayString.toString().replace(/,/g, "");
    let parts = displayString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    displayString = parts.join(".");
    screenNum.innerText = displayString;
}

function concat(input) {
    displayString = String(displayString)
    if (displayString === "0" && input === "."){}
    else if (displayString === "0") {
        displayString = "";
    }

    // check if decimal
    if (decimal === true && input === ".") {
        input = "";
    }
    
    if (input === "." && decimal === false) {
        decimal = true;
    }

    displayString += input;
    display();

}

function add() {
    numbers.push(Number(displayString.replace(/,/g, "")));
    operators.push("+");
    displayString = "0";
    display();
}

function sub() {
    numbers.push(Number(displayString.replace(/,/g, "")));
    operators.push("-");
    displayString = "0";
    display();
}

function mult() {
    numbers.push(Number(displayString.replace(/,/g, "")));
    operators.push("*");
    displayString = "0";
    display();
}

function div() {
    numbers.push(Number(displayString.replace(/,/g, "")));
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
    decimal = false;
    display();
}

function del() {
    if (displayString === "0") {} // if display string is just 0, do nothing
    else { // delete
        if (displayString.slice(-1) === ".") {
            decimal = false;
        }
        displayString = String(displayString);
        displayString = displayString.slice(0, -1);

        if (displayString === ""){
            displayString = "0";
        }

        display();
    }
}

// Event listeners

window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('colorTheme');
    theme && document.documentElement.setAttribute('data-theme', theme);
});