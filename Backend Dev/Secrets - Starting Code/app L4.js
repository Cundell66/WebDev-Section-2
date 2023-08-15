//jshint esversion:6
import {} from "dotenv/config";
import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}) );

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


const User = mongoose.model("User", userSchema);


app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    bcrypt.hash(req.body.password, saltRounds)
    .then((hash)=>{
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
        newUser.save()
        .then(()=>{
            console.log("New User Added");
            res.render("secrets");
        })
        .catch((err)=>{
            console.log(err);
        });    
    })
    .catch((err)=>{
        console.log(err);
    }); 
    
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({email: username})
    .then((foundUser)=>{
        if (foundUser){
            bcrypt.compare(password, foundUser.password)
            .then((result)=>{
                if(result){
                    res.render('secrets');
                } else {
                    res.redirect("login");
                }
            })
            .catch((err)=>{
                console.log(err);
            });  
        } else {
            res.send("No Such User");
        }
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});