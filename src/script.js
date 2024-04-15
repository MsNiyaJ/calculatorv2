import ButtonHandler from "./buttons.js";

function setupCalculatorButtonFunctionality(event) {
  const type = event.target.className;
  const value = event.target.innerHTML;
  new ButtonHandler(type, value);
}

function setupClickListener(calculatorButton) {
  calculatorButton.addEventListener("click", (event) =>
    setupCalculatorButtonFunctionality(event)
  );
}

// Setup click listeners for all buttons on the calculator
function addEventListenersToButtons() {
  const calculatorButtons = document.querySelectorAll("button");
  calculatorButtons.forEach((calculatorButton) => {
    setupClickListener(calculatorButton);
  });
}

function startApp() {
  addEventListenersToButtons();
}

startApp();
