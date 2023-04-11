const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const { port } = require('./config/index');

// list of routes
const routes = require('./api/routes/index');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/", routes);

app.get("/health", (req, res) => {
  res.send("it work");
})

app.listen(port || 3000, () => {
  console.log(`Example app listening on port ${port}`)
})