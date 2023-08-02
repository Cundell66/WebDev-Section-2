import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {userName, discogsToken} from "./discogs.js";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var count = Math.floor(Math.random()*342);
var page = 1;
var total;

const discogsURL =`https://api.discogs.com/users/${userName}/collection/folders/4061773/releases?token=${discogsToken}`;

app.get("/", async (req, res) => {
    if (count>49){
        page = Math.floor(count/49);
        count = count%49;
    }try {
        const discogs = await axios.get(discogsURL+"&page="+page);
        const result = JSON.parse(JSON.stringify(discogs.data));
        total = result.pagination.items;
        const contents = result.releases[count].basic_information;
        res.render("index.ejs", { 
            contents: contents,
        });
      } catch (error) {
        res.render("index.ejs", { contents: JSON.stringify(error) });
      }

  });

app.post("/", async (req, res) => {
    count = Math.floor(Math.random()*total);
    if (count>49){
        page = Math.floor(count/49);
        count = count%49;
    }
    try {
        const discogs = await axios.get(discogsURL+"&page="+page);
        const result = JSON.parse(JSON.stringify(discogs.data));
        const contents = result.releases[count].basic_information;
        res.render("index.ejs", { 
            contents: contents,
        });
      } catch (error) {
        res.render("index.ejs", { contents: JSON.stringify(error) });
      }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

