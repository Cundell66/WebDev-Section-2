// jshint esversion:6

const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.use(bodyParser.urlencoded({extended: true}))

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("The sum is: " + result);
    // res.send("Thanks for sending that");
})

app.get('/bmiCalculator', (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
  })

app.post('/bmiCalculator', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var bmi = Math.round(weight/(height * height));
    res.send("Your BMI is: " + bmi);
    // res.send("Thanks for sending that");
})
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})