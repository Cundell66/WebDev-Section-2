// jshint esversion:6

const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

app.get('/contact',(req, res) =>{
    res.send('contact me on threads');
});

app.get('/about',(req, res) =>{
    res.send('<h2>Pauls home-made about page</h2>');
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});


