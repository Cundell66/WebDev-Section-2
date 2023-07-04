const prompt = require('prompt-sync')();
const alert = console.log;


function fibonacciGenerator (n) {
    //Do NOT change any of the code above 👆
         
    //Write your code here:
    var fib = [0, 1];
        if (n > 2){
            for (var count = 2; count < n; count++){
                fib.push(fib[count-2]+fib[count-1]);
            }

        }
        else if (n==1){fib.pop();}
        
        
        return fib;
        
        
        
        
        //Return an array of fibonacci numbers starting from 0.
        
    //Do NOT change any of the code below 👇
    }

alert(fibonacciGenerator(10));