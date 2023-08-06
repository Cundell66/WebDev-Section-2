import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// import secrets from discogs.js which is not on github
import { userName, discogsToken, folderID } from "./discogs.js";

// initialise app on port 3000
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// initialise variables for item, pages and number of items 
let itemNo, page, totalItems;

//set urls for required routes
const discogsURL = `https://api.discogs.com/users/${userName}/collection/folders/${folderID}/releases?token=${discogsToken}`;
const masterURL = 'https://api.discogs.com/masters/';

// generate random number to select random title
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// steps used in both post and get gathered together in function
async function fetchContents() {
  const discogs = await axios.get(discogsURL + "&page=" + page);
  const { releases } = discogs.data;
  totalItems = discogs.data.pagination.items;
  const contents = releases[itemNo].basic_information;
  const { master_id: idNumber } = contents;
  const master = await axios.get(masterURL + idNumber);
  const { tracklist } = master.data;
  return { contents, tracklist };
}

//first get to home page using 342 as a initial total before calling fetch contents
app.get("/", async (req, res) => {
  itemNo = getRandomNumber(342);
  page = Math.floor(itemNo / 49) + 1;
  itemNo = itemNo % 49;
  try {
    const { contents, tracklist } = await fetchContents();
    res.render("index.ejs", {
      contents: contents,
      tracklist: tracklist,
    });
  } catch (error) {
    res.render("index.ejs", { contents: JSON.stringify(error) });
  }
});

// after clicking next generate another random title
app.post("/", async (req, res) => {
  itemNo = getRandomNumber(totalItems);
  page = Math.floor(itemNo / 49);
  itemNo = itemNo % 49;
  try {
    const { contents, tracklist } = await fetchContents();
    res.render("index.ejs", {
      contents: contents,
      tracklist: tracklist,
    });
  } catch (error) {
    res.render("index.ejs", { contents: JSON.stringify(error) });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
