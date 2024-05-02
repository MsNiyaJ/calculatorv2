import Calculator from "./calculator.js";
import ScreenManager from "./screen-manager.js";
import { operations } from "./operations.js";

// Exporting for testing purposes
export const calculator = new Calculator();
export const screen = new ScreenManager();

class Button {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

class NumberButton extends Button {
  updateScreen() {
    if (screen.isZero) {
      screen.clear();
    }

    screen.append(this.value);
  }

  click() {
    this.updateScreen();
    calculator.updateCurrentNumber();
  }
}

// performs an operation on the current number on the screen
class NumberManipulationButton extends Button {
  click() {
    const manipulation = operations[this.id];
    calculator.manipulateCurrentNumber(manipulation);
    calculator.updateCurrentNumber();
  }
}

class OperationButton extends Button {
  get operation() {
    return operations[this.id];
  }

  click() {
    calculator.setOperation(this.operation);
    screen.setToZero(); // TODO: fix this. It should only clear the screen if the user is starting a new number
  }
}

class DecimalButton extends Button {
  get currentNumberHasADecimal() {
    return screen.screenText.includes(this.value);
  }

  updateScreen() {
    if (!this.currentNumberHasADecimal) {
      screen.append(this.value);
    }
  }

  click() {
    this.updateScreen();
  }
}

class EqualsButton extends Button {
  click() {
    calculator.operate();
  }
}

class ClearButton extends Button {
  click() {
    screen.setToZero();
    calculator.resetEquation();
  }
}

export default class ButtonClickHandler {
  button = null;
  type = null;

  /**
   * @param {string} id    Unique identifier for the button
   * @param {string} type  Used to determine which button class to instantiate
   * @param {string} value Example: 1, +, ., =, C, etc.
   */
  constructor(id, type, value) {
    this.id = id;
    this.type = type;
    this.mapButtonToClass(id, type, value);
    this.click();
  }

  mapButtonToClass(id, type, value) {
    const buttonTypes = {
      number: new NumberButton(id, value),
      numberManipulator: new NumberManipulationButton(id, value),
      operation: new OperationButton(id, value),
      decimal: new DecimalButton(id, value),
      equals: new EqualsButton(id, value),
      clear: new ClearButton(id, value),
    };
    this.button = buttonTypes[type] || null;
  }

  logTypeError() {
    console.error({
      statusCode: 404,
      buttonId: this.id,
      clickEvent: this.type,
      message: "Unable to setup click handler. Button type not found",
    });
  }

  click() {
    if (this.button) {
      this.button.click();
    } else {
      this.logTypeError();
    }

    // console.log(calculator);
  }
}
