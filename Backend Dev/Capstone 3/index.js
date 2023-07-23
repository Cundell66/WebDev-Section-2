import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const homeTasks = [];
const workTasks = [];

app.get("/", (req, res) => {
    res.render("index.ejs",{tasks: homeTasks});
  });

app.get("/work", (req, res) => {
res.render("work.ejs",{tasks: workTasks});
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
  });

app.post("/",(req, res) => {
  homeTasks.push(req.body["task"]);
  res.render("index.ejs",{tasks: homeTasks});  }
)

app.post("/work",(req, res) => {
  workTasks.push(req.body["task"]);
  res.render("work.ejs",{tasks: workTasks});  }
)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
