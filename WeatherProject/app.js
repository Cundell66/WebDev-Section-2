const express = require('express');

const https = require('https');

const url = "https://api.openweathermap.org/data/2.5/weather?q=leeds,uk&appid=30e828999e64deb95260f942bd7fd5c5&units=metric";

const app = express();

app.get("/", function(req, res){
    https.get(url, function(response){
        console.log(response);
    })
    res.send("Server is up and running");
})




app.listen(3000, function() {
    console.log("Server is running on port 3000");
    
})