const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const apiKey = "30e828999e64deb95260f942bd7fd5c5";
const units = "metric";


const imgURL1 = "https://openweathermap.org/img/wn/";
const imgURL2 = "@2x.png"; 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        var temp = weatherData.main.temp;
        var icon = weatherData.weather[0].icon;
        var imageURL = imgURL1 + icon + imgURL2;
        description = weatherData.weather[0].description;
        var message =  description + " and " + temp + " degrees Celsius";
        res.write("<p>Weather in " + weatherData.name + ": </p>");
        res.write('<h1>' + message + '</h1>');
        res.write("<img src=" + imageURL + ">");
        res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
    
})

    // // res.send("Server is up and running");
