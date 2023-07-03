const prompt = require('prompt-sync')();
const alert = console.log;

var you = prompt("What Is Your Name? ");
var crush = prompt("What is your crush's name? ");
alert("Ha Ha " + you + " fancies " + crush);

var loveScore = Math.floor(Math.random()*100)+1;
alert(" and your lurve score is " + loveScore);
if (loveScore > 70) {
    alert("Think I need a new hat!")
}
