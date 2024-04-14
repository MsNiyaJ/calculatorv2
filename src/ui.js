class UI {
    // UI Selectors
    screenTxt = document.querySelector('#screen-text');

    // display values on the calculator screen
    display = (value) => {
        // if(equation.result !== ''){
        //     this.screenTxt.textContent = equation.result;               //Display the result of the equation
        // } else if(equation.operator === ''){
        //     this.screenTxt.textContent = (equation.operand1 += num);   //Set operand1 & display it on the screen
        // } else if(equation.operator !== ''){
        //     this.screenTxt.textContent = (equation.operand2 += num);   //Set operand2 & display it on the screen
        // }
        this.screenTxt.textContent = value;
    }

    // set the screen back to 0
    clear = () => {
        this.screenTxt.textContent = '';
    }

    //adds a style for an operator button that was pushed
    activatePress = (element) => {
        if(!(element.classList.contains('pressed-btn'))){
            element.classList.add("pressed-btn");
        }
    }

    deactivatePress = (element) => {
        if(element.classList.contains('pressed-btn')){
            element.classList.remove("pressed-btn");
        }
    }
}

export default UI; 