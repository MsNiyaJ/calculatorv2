class Calculator {
  firstNumber = 0;
  secondNumber = 0;
  operation = null;

  resetEquation() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.operation = null;
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
    return this.operation.apply(this.firstNumber, this.secondNumber);
  }
}

export default Calculator;
