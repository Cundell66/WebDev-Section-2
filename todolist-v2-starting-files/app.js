//jshint esversion:6

import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"]
  }
  });

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your ToDo List"
});

const item2 = new Item ({
  name: "Hit the + button to add an item"
});

const item3 = new Item ({
  name: "<-- hit this to delete an item"
});

const defaultItems = [item1, item2, item3];



app.get("/", function(req, res) {
  Item.find()
    .then (items => {
      if (items.length === 0){
            Item.insertMany(defaultItems)
        .then(function(){
            console.log("Successfully saved all the items to todolistDB");
        })
        .catch(function(err){
            console.log(err);
        });

      } else {
        res.render("list", {listTitle: "Today", newListItems: items});
      }
    })  
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });


  item.save();

  res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.post("/delete", function(req, res){
  const itemName = req.body;
  console.log(itemName);
})

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
