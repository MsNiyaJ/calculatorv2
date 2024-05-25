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

  formatResult(result) {
    const isLargeNumber = result.toString().length > this.MAX_CHARS;
    const isString = typeof result === "string";
    if (isLargeNumber && !isString) {
      return result.toPrecision(this.MAX_CHARS);
    }

    return result;
  }

  operateAndStartNewEquation() {
    if (!this.operation) return "Error";

    const result = this.operation.apply(this.firstNumber, this.secondNumber);
    const formattedResult = this.formatResult(result);
    this.resetEquation();
    this.setFirstNumber(Number(formattedResult) || 0);
    this.screenText = formattedResult;
    this.result = formattedResult;
  }

  manipulateCurrentNumber(manipulation) {
    const manipulatedNumber = manipulation.apply(this.currentNumber);
    const formattedResult = this.formatResult(manipulatedNumber);
    this.screenText = formattedResult;
    this.updateCurrentNumber();
    this.result = this.formatResult(formattedResult);
  }
}

export default Calculator;
