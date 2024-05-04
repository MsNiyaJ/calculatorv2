import ScreenManager from "./screen-manager.js";

class Calculator extends ScreenManager {
  firstNumber = 0;
  secondNumber = 0;
  operation = null;
  result = null;

  get currentNumber() {
    // We need the currentNumber to be a string to prevent
    // decimals from being removed when converted to a number
    return this.screenText;
  }

  get isStartingNewNumber() {
    return !!this.operation && this.secondNumber === 0;
  }

  resetEquation() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.operation = null;
    this.result = null;
  }

  updateCurrentNumber() {
    if (!this.operation) {
      this.setFirstNumber(this.currentNumber);
    } else {
      this.setSecondNumber(this.currentNumber);
    }
  }

  setFirstNumber(num) {
    this.firstNumber = num;
  }

  setSecondNumber(num) {
    this.secondNumber = num;
  }

  setOperation(operation) {
    this.operation = operation;
  }

  operateAndStartNewEquation() {
    if (!this.operation) return "Error";
    const result = this.operation.apply(
      Number(this.firstNumber),
      Number(this.secondNumber)
    );
    this.resetEquation();
    this.setFirstNumber(result);
    this.screenText = result;
  }

  manipulateCurrentNumber(manipulation) {
    const manipulatedNumber = manipulation.apply(Number(this.currentNumber));
    this.screenText = manipulatedNumber;
  }
}

export default Calculator;
