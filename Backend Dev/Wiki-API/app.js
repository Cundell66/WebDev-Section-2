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

app.route("/articles")
    .get(function(req, res){
      Article.find()
      .then((articles)=>{
          res.send(articles);
        })
        .catch((err)=>{
          console.log(err);
        });
  })
    .post(function(req, res){
      const newTitle= req.body.title;
      const newContent= req.body.content;
      const newArticle = new Article({
          title: newTitle,
          content: newContent
      })
      .then(()=>{
        newArticle.save();
      })
      .catch((err)=>{
        console.log(err);
      });;
      // console.log(title, content);
      
  })
    .delete(function(req, res){
      Article.deleteMany()
      .then(()=>{
        res.send("All articles successfully deleted");
      })
      .catch((err)=>{
        console.log(err);
      });
  });

app.route("/articles/:articleTitle")
  .get(function(req, res){
    const destination = req.params.articleTitle;
    Article.findOne({title: destination})
      .then(foundArticle => {
        if(foundArticle){
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title");
      }})
      .catch((err)=>{
        console.log(err);
      });
    })
  .patch(async function (req, res) {
    await Article.updateOne({title: req.params.articleTitle},
      req.body
      )
      .then(()=>{
        res.send("Article patched");
      })
      .catch((err)=>{
        console.log(err);
      });  
      
    })
  .put(async function (req, res) {
    await Article.replaceOne({title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content}
      )
      .then(()=>{
        res.send("Article updated");
      })
      .catch((err)=>{
        console.log(err);
      });  
    })
  .delete(async function(req, res){
    await Article.deleteOne({title: req.params.articleTitle})
    .then(()=>{
      res.send("Article deleted");
    })
    .catch((err)=>{
      console.log(err);
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});