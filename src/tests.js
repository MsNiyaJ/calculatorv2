// TODO: Consider using Jest or another testing library
import { calculator, screen } from "./buttons.js";
import { operations } from "./operations.js";

let passedTests = 0;
let failedTests = 0;

export function runAllTests() {
  console.log("Running tests...");
  testClear();
  testNumberButton();
  testAddition();
  testSubtraction();
  testMultiplication();
  testDivision();
  testSquareRoot();
  testNegate();
  testPercentage();
  testDecimal();
  testMultipleOperations();
  testChangeOperation();
  testScreen();

  console.log(`Tests complete. ${passedTests} passed, ${failedTests} failed.`);
}

function testDecimal() {
  test("can add a decimal to the screen", () => {
    click("decimal");
    expect(screen.screenText).toBe("0.");
  });

  test("can only add one decimal to the screen", () => {
    click("decimal");
    click("decimal");
    expect(screen.screenText).toBe("0.");
  });

  test("should prepend 0 to decimal for a new number", () => {
    click("1");
    click("add");
    click("decimal");
    click("2");
    expect(screen.screenText).toBe("0.2");
  });

  test("should clear decimal when starting a new number", () => {
    click("decimal");
    click("add");
    click("1");
    expect(screen.screenText).toBe("1");
  });
}

function testSquareRoot() {
  test("can square root a number", () => {
    click("9");
    click("squareRoot");
    expect(screen.screenText).toBe("3");
  });

  test("can get sum of two square roots", () => {
    click("4");
    click("squareRoot");
    expect(screen.screenText).toBe("2");
    click("add");
    click("9");
    click("squareRoot");
    expect(screen.screenText).toBe("3");
    click("equals");
    expect(screen.screenText).toBe("5");
  });

  test("starts new equation if number is pressed after squareroot", () => {
    click("9");
    click("squareRoot");
    click("1");
    expect(screen.screenText).toBe("1");
    click("add");
    click("2");
    click("equals");
    expect(screen.screenText).toBe("3");
  });
}

function testNegate() {
  test("can negate a number", () => {
    click("9");
    click("decimal");
    click("negate");
    expect(screen.screenText).toBe("-9");
  });

  test("can get difference of two negated numbers", () => {
    click("9");
    click("negate");
    expect(screen.screenText).toBe("-9");
    click("subtract");
    click("1");
    click("negate");
    click("equals");
    expect(screen.screenText).toBe("-8");
  });
}

function testPercentage() {
  test("can calculate percentage of a number", () => {
    click("9");
    click("percent");
    expect(screen.screenText).toBe("0.09");
  });
}

function testNumberButton() {
  test("can add a number to the screen", () => {
    click("1");
    click("2");
    click("3");
    expect(screen.screenText).toBe("123");
  });
}

function testAddition() {
  test("can add two large numbers", () => {
    calculator.setFirstNumber("9.5");
    calculator.setOperation(operations.add);
    calculator.setSecondNumber("-2");
    click("equals");
    expect(screen.screenText).toBe("7.5");

    calculator.setFirstNumber("22222222222222222222");
    calculator.setOperation(operations.add);
    calculator.setSecondNumber("33333333333333333333");
    click("equals");
    expect(screen.screenText).toBe("55555555555555555555");
  });

  test("can add two decimal numbers", () => {
    click("1");
    click("decimal");
    click("5");
    expect(screen.screenText).toBe("1.5");
    calculator.setOperation(operations.add);
    click("2");
    click("decimal");
    click("5");
    expect(screen.screenText).toBe("2.5");
    click("equals");
    expect(screen.screenText).toBe("4");
  });
}

function testSubtraction() {
  test("can subtract two numbers", () => {
    calculator.setFirstNumber("5");
    calculator.setOperation(operations.subtract);
    calculator.setSecondNumber("2");
    click("equals");
    expect(screen.screenText).toBe("3");
  });
}

function testMultiplication() {
  test("can multiply two numbers", () => {
    calculator.setFirstNumber("5");
    calculator.setOperation(operations.multiply);
    calculator.setSecondNumber("2");
    click("equals");
    expect(screen.screenText).toBe("10");
  });
}

function testDivision() {
  test("can divide two positive numbers", () => {
    calculator.setFirstNumber("6776");
    calculator.setOperation(operations.divide);
    calculator.setSecondNumber("2");
    click("equals");
    expect(screen.screenText).toBe("3388");
  });

  test("see snarky error message when dividing by zero", () => {
    calculator.setFirstNumber("5");
    calculator.setOperation(operations.divide);
    calculator.setSecondNumber("0");
    click("equals");
    expect(screen.screenText).toBe("Go back to school...");
  });
}

function testClear() {
  test("can clear the screen", () => {
    click("1");
    expect(screen.screenText).toBe("1");
    click("clear");
    expect(screen.screenText).toBe("0");
  });
}

function testMultipleOperations() {
  test("can evaluate multiple operations with equals", () => {
    click("1");
    click("2");
    click("add");
    expect(screen.screenText).toBe("12");
    click("7");
    click("equals");
    expect(screen.screenText).toBe("19");
    click("subtract");
    click("2");
    click("equals");
    expect(screen.screenText).toBe("17");
  });

  test("can evaluate multiple operations without equals", () => {
    click("1");
    click("add");
    expect(screen.screenText).toBe("1");
    click("2");
    click("add");
    expect(screen.screenText).toBe("3");
    click("3");
    click("multiply");
    click("2");
    click("equals");
    expect(screen.screenText).toBe("12");
  });
}

function testChangeOperation() {
  test("can change operation after clicking one", () => {
    click("7");
    click("add");
    click("subtract");
    click("3");
    click("equals");
    expect(screen.screenText).toBe("4");
  });
}

function testScreen() {
  test("can clear screen text", () => {
    click("clear");
    expect(screen.screenText).toBe("0");
  });

  test("can append text to screen", () => {
    screen.screenText = "123";
    screen.append("4");
    expect(screen.screenText).toBe("1234");
  });

  test("screen wont append if max number of characters", () => {
    screen.MAX_CHARS;
    const enteredNumber = "123456789012345";
    screen.screenText = enteredNumber;
    screen.append("6");
    expect(screen.screenText).toBe(enteredNumber);
  });

  test("results are formatted to scientific notion if large", () => {
    calculator.setFirstNumber("123456789012345");
    calculator.setOperation(operations.multiply);
    calculator.setSecondNumber("2328942842.3892");
    click("equals");
    const isScientificNotation = screen.screenText.includes("e+");
    expect(isScientificNotation).toBe(true);
  });
}

function logTestResults(testDescription, testResult, color) {
  console.log(testDescription + ` %c${testResult}`, "color: " + color);
}

function test(description, testFunction) {
  try {
    testFunction();
    passedTests++;
    logTestResults(description, "PASSED", "green");
  } catch (error) {
    failedTests++;
    logTestResults(error + "\n" + description, "FAILED", "red");
  }
  click("clear");
}

const expect = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) {
      throw Error(`Expected ${expected}, but got ${actual}`);
    }
  },
});

function click(buttonId) {
  try {
    document.getElementById(buttonId).click();
  } catch (error) {
    console.log("Error clicking button: ", { buttonId, error });
  }
}
