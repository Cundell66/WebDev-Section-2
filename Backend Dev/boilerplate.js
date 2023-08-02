//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from "axios";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  
  
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



app.post("/tracks", async (req, res) => {
        const id = 199532;
        const fetchURL = masterURL+`${id}?token=`+discogsToken;
        console.log(fetchURL);
        const trackResult = await axios.get(masterURL+`${id}?token=`+discogsToken);
        
        var trackList = JSON.stringify(trackResult.tracklist);
        console.log("tracklist :" + trackList);
        trackList.forEach((track) => {
             console.log(`Track ${track.position}: ${track.title} (${track.duration})`);
        });
        
})