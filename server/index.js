const express = require("express");
const app = express();

const routes = require("./routes/qa");

const port = process.env.PORT || 8080;

app.use("/qa", routes);

app.listen(port, () => {
  console.log(` > Listening on port ${port}`);
});
