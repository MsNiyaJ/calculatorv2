import ScreenManager from "./screen-manager.js";

class Calculator extends ScreenManager {
  firstNumber = 0;
  secondNumber = 0;
  operation = null;
  result = null;

  resetEquation() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.operation = null;
    this.result = null;
  }

  updateCurrentNumber() {
    if (!this.operation) {
      this.setFirstNumber(this.screenText);
    } else {
      this.setSecondNumber(this.screenText);
    }
  }

  setFirstNumber(num) {
    this.firstNumber = Number(num);
  }

  setSecondNumber(num) {
    this.secondNumber = Number(num);
  }

  setOperation(operation) {
    this.operation = operation;
  }

  operate() {
    if (!this.operation) return "Error";
    this.result = this.operation.apply(this.firstNumber, this.secondNumber);
    this.screenText = this.result;
  }

  manipulateCurrentNumber(manipulation) {
    const currentNumber = Number(this.screenText);
    const manipulatedNumber = manipulation.apply(currentNumber);
    this.screenText = manipulatedNumber;
  }
}

export default Calculator;
