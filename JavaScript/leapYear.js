const prompt = require('prompt-sync')();
const alert = console.log;

function isLeapYear(year){
    if (((year % 4 == 0) && (year % 100 != 0))||(year % 400 == 0)){
        return "Leap year."
    }
    return "Not leap year."
}

alert(isLeapYear(1900));