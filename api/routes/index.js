const express = require('express');
const app = express();

const playerRoute = require('./player');

app.use("/players", playerRoute);

module.exports = app;