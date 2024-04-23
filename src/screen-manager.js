class ScreenManager {
  screen = document.querySelector("#screen-text");

  constructor() {
    this.setToZero();
  }

  setToZero() {
    this.screenText = "0";
  }

  clear() {
    this.screenText = "";
  }

  append(buttonText) {
    if (!this.screenHasMaxChars) this.screenText += buttonText;
  }

  get isZero() {
    return this.screenText === "0";
  }

  get screenHasMaxChars() {
    return this.screenText.length === 20;
  }

  get screenText() {
    return this.screen.textContent;
  }

  set screenText(text) {
    this.screen.textContent = text;
  }
}

export default ScreenManager;
