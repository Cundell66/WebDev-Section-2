const prompt = require('prompt-sync')();
const alert = console.log;

var dogAge = prompt("Enter the dog age: ");

var humanAge = ((dogAge - 2) * 4) + 21;

alert("The dog age " + dogAge + " is " + humanAge + " in human years");