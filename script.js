const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const operators = ['+', '-', '*', '/'];
let operation = [];
let currentNum = '';
let currentOperator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            currentNum += button.value;
            display.value = currentNum;
        }

        if (button.classList.contains('operator')) {
            if (currentNum !== '') {
                operation.push(Number(currentNum));
                currentNum = '';
            }

            if (currentOperator !== '') {
                operation.push(currentOperator);
            }

            currentOperator = button.value;
        }

        if (button.classList.contains('equals')) {
            operation.push(Number(currentNum));
            const result = calculate(operation);
            display.value = result;
            operation = [];
            currentNum = '';
            currentOperator = '';
        }

        if (button.classList.contains('clear')) {
            display.value = '';
            operation = [];
            currentNum = '';
            currentOperator = '';
        }
    });
});

function calculate(operation) {
    while (operation.includes('/') || operation.includes('*')) {
        const divideIndex = operation.indexOf('/');
        const multiplyIndex = operation.indexOf('*');

        if (divideIndex > -1 && (multiplyIndex === -1 || divideIndex < multiplyIndex)) {
            const left = operation[divideIndex - 2];
            const right = operation[divideIndex - 1];
            operation[divideIndex - 2] = left / right;
            operation.splice(divideIndex - 1, 2);
        }

        if (multiplyIndex > -1 && (divideIndex === -1 || multiplyIndex < divideIndex)) {
            const left = operation[multiplyIndex - 2];
            const right = operation[multiplyIndex - 1];
            operation[multiplyIndex - 2] = left * right;
            operation.splice(multiplyIndex - 1, 2);
        }
    }

    while (operation.includes('+') || operation.includes('-')) {
        const addIndex = operation.indexOf('+');
        const subtractIndex = operation.indexOf('-');

        if (addIndex > -1 && (subtractIndex === -1 || addIndex < subtractIndex)) {
            const left = operation[addIndex - 2];
            const right = operation[addIndex - 1];
            operation[addIndex - 2] = left + right;
            operation.splice(addIndex - 1, 2);
        }

        if (subtractIndex > -1 && (addIndex === -1 || subtractIndex < addIndex)) {
            const left = operation[subtractIndex - 2];
            const right = operation[subtractIndex - 1];
            operation[subtractIndex - 2] = left - right;
            operation.splice(subtractIndex - 1, 2);
        }
    }

    return operation[0];
}