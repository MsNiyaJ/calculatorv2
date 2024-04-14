class Calculator {
    add = function(num1, num2) {
        return num1 + num2;
    }
    
    subtract = function(num1, num2) {
        return num1 - num2;
    }
    
    multiply = function(num1, num2) {
        return num1 * num2;
    }
    
    divide = function(num1, num2) {
        //If the denominator is 0, return Not a Number
        if(num2 === 0)
            return 'Not a Number';
        return num1 / num2;
    };
    
    negate = function(num){
        return num * -1;
    }
    
    percent = function(num) {
        return num / 100;
    }
    
    squareroot = function(num) {
        return Math.sqrt(num);
    }

    operate(operator, num1, num2){
        num1 = Number(num1);
        num2 = Number(num2);
    
        if(operator === '+') 
            return this.add(num1, num2);
        else if(operator === '-')
            return this.subtract(num1, num2); 
        else if(operator === 'x')
            return this.multiply(num1, num2);
        else if(operator === '÷')
            return this.divide(num1, num2);
    }
    
}

export default Calculator