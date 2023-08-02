import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import Client from "disconnect";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


const discogsToken = "FNfVuEjSQXaenuhatQWLbFoxbFJbmOEkpacBBckg";
const userName = "cundell";
const apiURL = "https://dog.ceo/api/breeds/image/random";
const discogsURL =`https://api.discogs.com/users/${userName}/collection/folders/4061773/releases?token=${discogsToken}`;

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(discogsURL);
        const contents = JSON.stringify(result.data.thumb);
        res.render("index.ejs", { 
            contents: contents
        });
      } catch (error) {
        res.render("index.ejs", { contents: JSON.stringify(error.response.data) });
      }

  });



// app.get("/", async (req, res) => {
//     try {
//         const result = await axios.get(apiURL);
//         const contents = result.data.message;
//         res.render("index.ejs", { 
//             contents: contents
//         });
//       } catch (error) {
//         res.render("index.ejs", { content: JSON.stringify(error.response.data) });
//       }

//   });
  
  
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});