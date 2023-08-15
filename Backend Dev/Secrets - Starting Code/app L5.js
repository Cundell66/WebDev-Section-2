//jshint esversion:6
import {} from "dotenv/config";
import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}) );
app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res)
{   
    if (req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.post("/register", async function(req, res){

    await User.register({username: req.body.username}, req.body.password)
        .then((user)=>{
            passport.authenticate("local")(req, res, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/secrets")
                };
        });
        })
        .catch((err)=>{
            console.log(err);
            res.redirect("/register");
        });
    
});

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

app.get("/logout", function(req, res, next){
    req.logout(function(err){
        if (err) {console.log(next(err));}
        res.redirect("/");
    })
});


app.listen(3000, function(){
    console.log("Server started on port 3000.");
});