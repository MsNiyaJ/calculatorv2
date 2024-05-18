/** https://mikemcl.github.io/decimal.js */
class Add {
  apply(firstNumber, secondNumber) {
    const num1 = new Decimal(firstNumber);
    const num2 = new Decimal(secondNumber);
    return num2.add(num1).toString();
  }
}

class Subtract {
  apply(firstNumber, secondNumber) {
    const num1 = new Decimal(firstNumber);
    const num2 = new Decimal(secondNumber);
    return num1.sub(num2);
  }
}

class Multiply {
  apply(firstNumber, secondNumber) {
    const num1 = new Decimal(firstNumber);
    const num2 = new Decimal(secondNumber);
    return num1.mul(num2);
  }
}

class Divide {
  apply(firstNumber, secondNumber) {
    const snarkyErrorMessage = "Go back to school...";
    if (secondNumber === 0) return snarkyErrorMessage;

    const num1 = new Decimal(firstNumber);
    const num2 = new Decimal(secondNumber);
    return num1.dividedBy(num2);
  }
}

class SquareRoot {
  apply(number) {
    const num = new Decimal(number);
    return num.squareRoot();
  }
}

class Negate {
  apply(number) {
    const num = new Decimal(number);
    return num.neg();
  }
}

class Percent {
  apply(number) {
    const num = new Decimal(number);
    return num.dividedBy(100);
  }
}

export const operations = {
  add: new Add(),
  subtract: new Subtract(),
  multiply: new Multiply(),
  divide: new Divide(),
  squareRoot: new SquareRoot(),
  negate: new Negate(),
  percent: new Percent(),
};
