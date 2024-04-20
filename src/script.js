import ButtonClickHandler from "./buttons.js";

function setupCalculatorButtonFunctionality(event) {
  const id = event.target.id;
  const type = event.target.className;
  const value = event.target.innerHTML;
  new ButtonClickHandler(id, type, value);
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
