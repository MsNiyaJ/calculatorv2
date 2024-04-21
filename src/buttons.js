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
  addNumbersToEquation() {
    if (!calculator.operation) {
      calculator.setFirstNumber(screenManager.screenText);
    } else {
      calculator.setSecondNumber(screenManager.screenText);
    }
  }

  handleScreen() {
    if (screenManager.isZero) {
      screenManager.clear();
    }

    if (!screenManager.isMaxedOut) {
      screenManager.append(this.value);
    }
  }

  click() {
    this.handleScreen();
    this.addNumbersToEquation();
  }
}

class OperationButton extends Button {
  get operation() {
    return operations[this.id];
  }

  // TODO: For square root, negate, and percent, operate immediately and update the screen

  click() {
    calculator.setOperation(this.operation);
    screenManager.setToZero(); // TODO: fix this. It should only clear the screen if the user is starting a new number
  }
}

class DecimalButton extends Button {
  get currentNumberHasADecimal() {
    return screenManager.screenText.includes(this.value);
  }

  handleScreen() {
    if (!this.currentNumberHasADecimal) {
      screenManager.append(this.value);
    }
  }

  click() {
    this.handleScreen();
  }
}

class EqualsButton extends Button {
  click() {
    const result = calculator.operate();
    screenManager.screenText = result;
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
    this.button
      ? this.button.click()
      : console.error(
          `Unable to setup click handler. Button type ${type} not found`
        );
  }
}
