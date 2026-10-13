function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}

// Export functions for unit testing with Jest.
if (typeof module !== "undefined" && module.exports) {
    module.exports = { add, subtract, multiply, divide };
}

// Connect the calculator to the browser interface.
if (typeof document !== "undefined") {
    const display = document.getElementById("display");
    const buttons = document.querySelector(".buttons");

    if (display && buttons) {
        let currentValue = "0";
        let previousValue = null;
        let operator = null;
        let waitingForNumber = false;

        function updateDisplay() {
            display.value = currentValue;
        }

        function inputNumber(number) {
            if (currentValue === "Error" || waitingForNumber) {
                currentValue = number;
                waitingForNumber = false;
            } else {
                currentValue =
                    currentValue === "0" ? number : currentValue + number;
            }

            updateDisplay();
        }

        function inputDecimal() {
            if (currentValue === "Error" || waitingForNumber) {
                currentValue = "0.";
                waitingForNumber = false;
            } else if (!currentValue.includes(".")) {
                currentValue += ".";
            }

            updateDisplay();
        }

        function calculate() {
            if (operator === null || previousValue === null) return;

            const a = Number(previousValue);
            const b = Number(currentValue);
            let result;

            try {
                switch (operator) {
                    case "+":
                        result = add(a, b);
                        break;
                    case "-":
                        result = subtract(a, b);
                        break;
                    case "*":
                        result = multiply(a, b);
                        break;
                    case "/":
                        result = divide(a, b);
                        break;
                }

                if (!Number.isFinite(result)) {
                    result = "Error";
                } else {
                    result = Number(result.toPrecision(12)).toString();
                }
            } catch {
                result = "Error";
            }

            currentValue = String(result);
            previousValue = null;
            operator = null;
            waitingForNumber = true;
            updateDisplay();
        }

        function chooseOperator(nextOperator) {
            if (currentValue === "Error") return;

            if (operator !== null && !waitingForNumber) {
                calculate();
                if (currentValue === "Error") return;
            }

            previousValue = currentValue;
            operator = nextOperator;
            waitingForNumber = true;
        }

        function clearCalculator() {
            currentValue = "0";
            previousValue = null;
            operator = null;
            waitingForNumber = false;
            updateDisplay();
        }

        function deleteLastDigit() {
            if (currentValue === "Error" || waitingForNumber) {
                currentValue = "0";
                waitingForNumber = false;
            } else {
                currentValue = currentValue.slice(0, -1);

                if (currentValue === "" || currentValue === "-") {
                    currentValue = "0";
                }
            }

            updateDisplay();
        }

        buttons.addEventListener("click", function (event) {
            const button = event.target.closest("button");
            if (!button) return;

            if (button.dataset.number !== undefined) {
                inputNumber(button.dataset.number);
            } else if (button.dataset.operator) {
                chooseOperator(button.dataset.operator);
            } else {
                switch (button.dataset.action) {
                    case "clear":
                        clearCalculator();
                        break;
                    case "delete":
                        deleteLastDigit();
                        break;
                    case "decimal":
                        inputDecimal();
                        break;
                    case "calculate":
                        calculate();
                        break;
                }
            }
        });
    }
}