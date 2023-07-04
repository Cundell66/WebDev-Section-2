const prompt = require('prompt-sync')();
const alert = console.log;

var name = prompt("What is your name? ");
var guestList = ["Angela", "Jack", "Pat", "Lara", "Jason"];

if (guestList.includes(name)){
    alert("You're cool");
}
else{
    alert("names not down");
}