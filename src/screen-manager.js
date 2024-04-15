class ScreenManager {
  screen = document.querySelector("#screen-text");

  clear() {
    this.screen.textContent = "";
  }

  append(value) {
    this.screen.textContent += value;
  }

  get value() {
    return this.screen.textContent;
  }

  set value(value) {
    this.screen.textContent = value;
  }
}

export default ScreenManager;
