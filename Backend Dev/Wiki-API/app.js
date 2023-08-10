//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from 'mongoose';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/WikiDB", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
 
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res){
    Article.find()
    .then((articles)=>{
        res.send(articles);
        // articles.forEach(article => {
        //   res.send(article.title);
        // });
      })
      .catch((err)=>{
        console.log(err);
      });
})

app.post("/articles", function(req, res){
    const newTitle= req.body.title;
    const newContent= req.body.content;
    const newArticle = new Article({
        title: newTitle,
        content: newContent
    });
    // console.log(title, content);
    newArticle.save();
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});