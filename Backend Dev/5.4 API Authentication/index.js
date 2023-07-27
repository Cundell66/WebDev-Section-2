import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "cundell";
const yourPassword = "thomas93";
const yourAPIKey = "98205a06-e932-4d4d-b7c5-1b72b7b30958";
const yourBearerToken = "5bfdacd4-09d0-4588-b7be-45462afdcae4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." })
});

app.get("/noAuth", async(req, res) => {
  const response = await axios.get( API_URL +"random");
  const result = response.data;
  res.render("index.ejs",{content: result.secret});
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get( API_URL +"all", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },});
  const result = response.data;
  res.render("index.ejs",{content: result[0].secret});
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async(req, res) => {
  const response = await axios.get(API_URL+"filter?score=7",{
    auth: {
      apiKey: yourAPIKey,}});
  const result = response.data;
  res.render("index.ejs",{content: result[0].secret});
  
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  const response = await axios.get( API_URL +"user-secrets", {
    auth: {
      token: yourBearerToken,
      
    },});
  const result = response.data;
  res.render("index.ejs",{content: result[0].username});
 
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
