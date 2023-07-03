const prompt = require('prompt-sync')();

var name = prompt("enter your name: ");
var initial = name.slice(0,1);
var name = name.slice(1,name.length);
var name = name.toLowerCase();
initial = initial.toUpperCase();

console.log("Hello", initial + name);