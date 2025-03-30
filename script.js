'use strict';

const buttonValues = [
    "AC", "+/-", "%", "÷", 
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "del", "0", ".", "="
];

const numbers = buttonValues.filter(value => !isNaN(value));

const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const calculator = {
    currentValue: '',
    storedValue: '',
    operand: '',
    result: '',

    handleButtonClick: function(value) {
        if (value === 'del') {
            this.delete();
        }
        else if (value === 'AC') {
            this.clearAll();
        }
        else if (value === '=') {
            this.calculate();
        }
        else if (value === '+/-') {
            this.currentValue *= -1;
            display.value = this.currentValue;
        }
        else if (["%", "÷", "×", "-", "+"].includes(value)) {
            this.operate(value);
        }
        else {
            this.appendNumber(value);
        }
    },

    appendNumber: function(value) {
        this.currentValue += value;
        display.value = this.currentValue;
    },

    delete: function() {
        this.currentValue = this.currentValue.slice(0, -1);
        display.value = this.currentValue;
    },

    operate: function(operand) {
        if (this.storedValue !== '' && this.currentValue !== '') {
            this.calculate();
            this.currentValue = this.result;
            display.value = this.result;
        }
        else {
            display.value = '';
        }

        this.storedValue = this.currentValue;
        this.currentValue = '';
        this.operand = operand;
    },

    calculate: function() {
        switch(this.operand) {
            case '%':
                this.result = Number(this.storedValue) % Number(this.currentValue);
                break;
            case '÷':
                if (this.currentValue == '0') {
                    this.clearAll();
                    display.value = 'Undefined';
                    return;
                }
                this.result = Number(this.storedValue) / Number(this.currentValue);
                break;
            case '×':
                this.result = Number(this.storedValue) * Number(this.currentValue);
                break;
            case '-':
                this.result = Number(this.storedValue) - Number(this.currentValue);
                break;
            case '+':
                this.result = Number(this.storedValue) + Number(this.currentValue);
                break;
        }

        if (this.result % 1 != 0) {
            this.result = (Math.round(this.result * 100) / 100).toFixed(2);
        }

        display.value = this.result;
        this.currentValue = this.result;
        this.storedValue = '';
    },

    clearAll: function() {
        this.currentValue = '';
        this.storedValue = '';
        this.operand = '';
        this.result = '';
        display.value = '';
    },
};

for (let i = 0; i < buttonValues.length; i++) {
    const value = buttonValues[i];
    const button = document.createElement('button');
    button.innerText = value;
    
    buttonContainer.appendChild(button);

    const buttonValue = button.innerText;

    button.addEventListener('click', () => {
        calculator.handleButtonClick(value);
    });
}