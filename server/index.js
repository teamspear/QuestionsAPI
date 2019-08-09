const express = require('express');

const app = express();

const cors = require('cors');

const routes = require('./routes/qa');

const port = process.env.PORT || 8080;

app.use(cors());
app.use('/qa', routes);

app.use(express.static('token'));

app.listen(port, () => {
  console.log(` > Listening on port ${port}`);
});
