const express = require("express");
const data = require("./dataList");
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(3009, () => {});
