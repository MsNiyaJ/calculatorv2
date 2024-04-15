class Add {
  apply(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  }
}

class Subtract {
  apply(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  }
}

class Multiply {
  apply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  }
}

class Divide {
  apply(firstNumber, secondNumber) {
    if (secondNumber === 0) return "Error";
    return firstNumber / secondNumber;
  }
}

class SquareRoot {
  apply(number) {
    return Math.sqrt(number);
  }
}

class Negate {
  apply(number) {
    return number * -1;
  }
}

class Percent {
  apply(number) {
    return number / 100;
  }
}

export const operations = {
  add: new Add(),
  subtract: new Subtract(),
  multiplay: new Multiply(),
  divide: new Divide(),
  squareRoot: new SquareRoot(),
  negate: new Negate(),
  percent: new Percent(),
};
