const bodyParser = require("body-parser");

const request = require("request");

const express = require('express');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/signup.html");
})

app.post("/", function(req, res){
    var firstName = req.body.firstName;
    var secondName = req.body.secondName;
    var emailAddress = req.body.emailAddress;
    

    console.log("item posted " + firstName);
    console.log("item posted " + secondName);
    console.log("item posted " + emailAddress);
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");
    
})