class Button {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class NumberButton extends Button {
  click() {
    // TODO: Implement this method
    console.log("NumberButton clicked");
  }
}

class OperationButton extends Button {
  click() {
    // TODO: Implement this method
    console.log("OperationButton clicked");
  }
}

class DecimalButton extends Button {
  click() {
    // TODO: Implement this method
    console.log("DecimalButton clicked");
  }
}

class EqualsButton extends Button {
  click() {
    // TODO: Implement this method
    console.log("EqualsButton clicked");
  }
}

class ClearButton extends Button {
  click() {
    // TODO: Implement this method
    console.log("ClearButton clicked");
  }
}

export default class ButtonHandler {
  constructor(type, value) {
    const buttonTypes = {
      number: new NumberButton(type, value),
      operation: new OperationButton(type, value),
      decimal: new DecimalButton(type, value),
      equals: new EqualsButton(type, value),
      clear: new ClearButton(type, value),
    };

    const buttonType = buttonTypes[type] || null;
    // console.log("buttonType", buttonType);
    if (buttonType) {
      buttonType.click();
    } else {
      console.error("Invalid button type");
    }
  }
}
