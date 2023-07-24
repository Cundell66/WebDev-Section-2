import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const homeTasks = [];
const workTasks = [];

app.get("/", (req, res) => {
    // const allTasks = homeTasks.concat(workTasks);
    res.render("index.ejs",{tasks: homeTasks.concat(workTasks)});
  });

app.get("/home", (req, res) => {
    res.render("home.ejs",{tasks: homeTasks});
  });

app.get("/work", (req, res) => {
    res.render("work.ejs",{tasks: workTasks});
  });

app.post("/",(req, res) => {
  homeTasks.push(req.body["task"]);
  res.render("index.ejs",{tasks: homeTasks.concat(workTasks)});  }
)

app.post("/home",(req, res) => {
  homeTasks.push(req.body["task"]);
  res.render("home.ejs",{tasks: homeTasks});  }
)

app.post("/work",(req, res) => {
  workTasks.push(req.body["task"]);
  res.render("work.ejs",{tasks: workTasks});  }
)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
