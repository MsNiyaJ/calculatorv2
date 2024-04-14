import UI from "./ui.js";
import Calculator from "./calculator.js";

const ui = new UI();
const calc = new Calculator();

class Equation {
  constructor() {
    this.operand1 = "";
    this.operator = "";
    this.operand2 = "";
    this.result = "";
  }
}

let eq = new Equation();

//Add an event listener to each number button
const numbers = Array.from(document.querySelectorAll(".numbers"));
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    //Create a new equation after a result was displayed and a number was clicked
    if (eq.result.length !== 0) {
      eq = new Equation();
    }

    if (eq.operator === "") {
      ui.display((eq.operand1 += number.textContent));
    } else if (eq.operator !== "") {
      ui.display((eq.operand2 += number.textContent));
    }

    console.log(eq);
  });
});

//Add an event listener to each operator button
const operators = Array.from(document.querySelectorAll(".operators"));
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (eq.operand1 !== "" && eq.operand2 === "") {
      ui.activatePress(operator);
      eq.operator = operator.textContent;
    }
    console.log(eq);
  });
});
//         if(!equationIsSet()){
//             togglePress(operator);
//             setOperator(operator.textContent);
//         }else{
//             operate(eq.operator, eq.operand1, eq.operand2);
//             display(eq.result);

//             //Set the previous result as operand1 in the new equation
//             let result = eq.result;
//             eq = new Equation();
//             eq.operand1 = result;

//             togglePress(operator);
//             setOperator(operator.textContent);
//         }
//         console.log(eq);
//     });
// });

// //Displays numbers on the screen
// const display = function(num){
//     if(eq.result !== ''){
//         screenTxt.textContent = eq.result;              //Display the result of the equation
//     }
//     else if(eq.operator === ''){
//         screenTxt.textContent = (eq.operand1 += num);   //Set operand1 & display it on the screen
//     }else if(eq.operator !== ''){
//         screenTxt.textContent = (eq.operand2 += num);   //Set operand2 & display it on the screen
//     }
// }

// //Returns true when the operands and operator are nonempty
// const equationIsSet = function(){
//     const arr = [eq.operand1, eq.operator, eq.operand2];
//     return arr.every((currentValue) => currentValue !== '');
// }

// //Adds a style to the pressed operator button
// const togglePress = function(operator){
//     operator.classList.add('pressed-btn');
//     removeSiblingPress(operator);
// }

// //Removes style from other buttons that were pressed previously
// const removeSiblingPress = function(operator){
//     for(const op of operators){
//         if(op !== operator){
//             op.classList.remove('pressed-btn');
//         }
//     }
// }

// //Set the operator of the equation
// const setOperator = function(operator){
//     eq.operator = operator;
// }

// //Add an event listener to the equal button
// const equalBtn = document.querySelector('.equalBtn');
// equalBtn.addEventListener('click', () => {
//     removeSiblingPress(-1);     //removes all pressed buttons
//     operate(eq.operator, eq.operand1, eq.operand2);
//     display(eq.result);
// });

// // Calls a math function based on the chosen operator
// function operate(operator, num1, num2){
//     num1 = Number(num1);
//     num2 = Number(num2);

//     if(operator === '+')
//         eq.result = add(num1, num2);
//     else if(operator === '-')
//         eq.result = subtract(num1, num2);
//     else if(operator === 'x')
//         eq.result = multiply(num1, num2);
//     else if(operator === '÷')
//         eq.result = divide(num1, num2);

//     console.log(eq);
// }

// //Add an event listener to the clear button
// const clearBtn = document.querySelector('#clear');
// clearBtn.addEventListener('click', () => clear());

// const add = function(num1, num2) {
// 	return num1 + num2;
// };

// const subtract = function(num1, num2) {
// 	return num1 - num2;
// };

// const multiply = function(num1, num2) {
// 	return num1 * num2;
// };

// const divide = function(num1, num2) {
//     //If the denominator is 0, return Not a Number
//     if(num2 === 0)
//         return 'Not a Number';
// 	return num1 / num2;
// };

// const negate = function(num){
//     return num * -1;
// }

// const percent = function(num) {
//     return num / 100;
// }

// const squareroot = function(num) {
//     return Math.sqrt(num);
// }

// const clear = function(){
//     removeSiblingPress(-1);
//     screenTxt.textContent = '0'; //Reset the screen to 0
//     eq = new Equation();         //Create a new equation
// }
