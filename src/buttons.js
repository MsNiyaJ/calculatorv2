import Calculator from "./calculator.js";
import ScreenManager from "./screen-manager.js";
import { operations } from "./operations.js";

const calculator = new Calculator();
const screen = new ScreenManager();

class Button {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }

  updateEquation() {
    if (!calculator.operation) {
      calculator.setFirstNumber(screen.screenText);
    } else {
      calculator.setSecondNumber(screen.screenText);
    }
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
    this.updateEquation();
  }
}

class NumberManipulationButton extends Button {
  get operation() {
    return operations[this.id];
  }

  click() {
    screen.screenText = this.operation.apply(screen.screenText);
    this.updateEquation();
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

  handleScreen() {
    if (!this.currentNumberHasADecimal) {
      screen.append(this.value);
    }
  }

  click() {
    this.handleScreen();
  }
}

class EqualsButton extends Button {
  handleScreen() {
    screen.screenText = calculator.result;
  }

  click() {
    calculator.operate();
    this.handleScreen();
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

    console.log(calculator);
  }
}
