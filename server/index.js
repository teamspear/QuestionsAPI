const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

const models = require("./models");

app.get("/", (req, res) => {
  res.send("Hello World!");
  models.getQuestion(1);
});

app.listen(port, () => {
  console.log(` > Listening on port ${port}`);
});
