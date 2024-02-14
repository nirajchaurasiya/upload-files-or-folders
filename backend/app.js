const express = require("express");

const app = express();

require("dotenv").config();

require("./config/connect");

app.use(
  express.json({
    limit: "16kb",
  })
);

module.exports = app;
