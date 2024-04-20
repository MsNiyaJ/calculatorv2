import Calculator from "./calculator.js";
import ScreenManager from "./screen-manager.js";
import { operations } from "./operations.js";

const calculator = new Calculator();
const screenManager = new ScreenManager();

class Button {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

class NumberButton extends Button {
  setupNumbersForCalculation() {
    if (!calculator.operation) {
      calculator.setFirstNumber(screenManager.screenText);
    } else {
      calculator.setSecondNumber(screenManager.screenText);
    }
  }

  click() {
    screenManager.append(this.value);
    this.setupNumbersForCalculation();
  }
}

class OperationButton extends Button {
  click() {
    // TODO: Set the operation for the calculator
    console.error("OperationButton not implemented yet", {
      id: this.id,
      value: this.value,
    });
  }
}

class DecimalButton extends Button {
  currentNumberHasADecimal() {
    return screenManager.screenText.includes(this.value);
  }

  click() {
    if (!this.currentNumberHasADecimal()) {
      screenManager.append(this.value);
    }
  }
}

class EqualsButton extends Button {
  click() {
    // TODO: Calculate the result of the equation and display it on the screen
    console.error("EqualsButton not implemented yet");
  }
}

class ClearButton extends Button {
  click() {
    screenManager.setToZero();
    calculator.resetEquation();
  }
}

export default class ButtonClickHandler {
  button = null;

  /**
   * Handles click events for the calculator buttons
   * @param {string} id    Unique identifier for the button
   * @param {string} type  A class gets mapped based on this type. Example: number, operation, decimal, equals, clear
   * @param {string} value Example: 1, +, ., =, C, etc.
   */
  constructor(id, type, value) {
    this.mapButtonToClass(id, type, value);
    this.click();
  }

  mapButtonToClass(id, type, value) {
    const buttonTypes = {
      number: new NumberButton(id, value),
      operation: new OperationButton(id, value),
      decimal: new DecimalButton(id, value),
      equals: new EqualsButton(id, value),
      clear: new ClearButton(id, value),
    };
    this.button = buttonTypes[type] || null;
  }

  click() {
    this.button ? this.button.click() : console.error("Button type not found");
  }
}
