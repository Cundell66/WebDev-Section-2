import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


const apiURL = "https://dog.ceo/api/breeds/image/random";

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(apiURL);
        const contents = result.data.message;
        res.render("index.ejs", { 
            contents: contents
        });
      } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      }

  });
  
  
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});