var express = require("express");
var app = express();

require("dotenv").config();
console.log("Hello World");

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", function (req, res) {
  let word = req.params.word;
  res.send({ echo: word });
});

app.get("/json", (req, res) => {
  let response = "";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({
    message: response,
  });
});

app.route("/name").get(function (req, res) {
  res.send({ name: req.query.first + " " + req.query.last });
});
//can add .post to handle post on same route

app.use("/public", express.static(__dirname + "/public"));
module.exports = app;
