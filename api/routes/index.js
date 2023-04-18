const express = require('express');
const app = express();

const playerRoute = require('./player');
const statRoute = require('./stat');

app.use("/players", playerRoute);
app.use("/stats", statRoute);

module.exports = app;