import express from "express";

const app = express();
const port = 3000;

var article = "a";
var timeOfWeek = "day";
var actionTime = "work hard";

const d = new Date();
let day = d.getDay();

if (day == 0 || day == 6){
    article= "the"
    timeOfWeek = "end";
    actionTime = "have fun"
}

app.get("/", (req, res) => {
    res.render("index.ejs",
    {article: article, timeOfWeek: timeOfWeek, actionTime: actionTime}
    );
  });
  
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});