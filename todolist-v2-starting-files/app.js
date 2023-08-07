//jshint esversion:6

import express from "express";
import { urlencoded } from "body-parser";
import { connect, model } from "mongoose";

const app = express();

app.set('view engine', 'ejs');

app.use(urlencoded({extended: true}));
app.use(express.static("public"));

connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"]
  }
  });

const Item = model("Item", itemsSchema);

const shopping = new Item ({
  name: "Go To Supermarket"
});

const cleaning = new Item ({
  name: "Clean Bathroom"
});

const cooking = new Item ({
  name: "Prepare casserole"
});

const defaultItems = [shopping, cleaning, cooking];

Item.insertMany(defaultItems)
    .then(function(){
        console.log("Successfully saved all the items to todolistDB");
    })
    .catch(function(err){
        console.log(err);
    });

app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});


app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
