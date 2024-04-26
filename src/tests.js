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
}

function testSquareRoot() {
  test("can square root a number", () => {
    click("9");
    click("squareRoot");
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
  test("can add two numbers", () => {
    calculator.setFirstNumber("9.5");
    calculator.setOperation(operations.add);
    calculator.setSecondNumber("-2");
    click("equals");
    expect(screen.screenText).toBe("7.5");
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
}

function testClear() {
  test("can clear the screen", () => {
    click("1");
    expect(screen.screenText).toBe("1");
    click("clear");
    expect(screen.screenText).toBe("0");
  });
}

/**
 * Your calculator should not evaluate more than a single
 * pair of numbers at a time. Example: you press a number
 * button (12), followed by an operator button (+), a
 * second number button (7), and finally a second operator
 * button (-). Your calculator should then do the following:
 * first, evaluate the first pair of numbers (12 + 7), second,
 * display the result of that calculation (19),
 * and finally, use that result (19) as the first number in
 * your new calculation, along with the next operator (-).
 */
function testMultipleOperations() {
  test("can evaluate multiple operations", () => {
    click("1");
    click("2");
    click("add");
    click("7");
    click("equals");
    expect(screen.screenText).toBe("19");
    click("subtract");
    click("2");
    click("equals");
    expect(screen.screenText).toBe("17");
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
    if (actual === expected) {
      return true;
    } else {
      throw Error(`Expected ${expected}, but got ${actual}`);
    }
  },
});

function click(buttonId) {
  try {
    document.getElementById(buttonId).click();
  } catch (error) {
    console.log("Error clicking button: ", buttonId, error);
  }
}
