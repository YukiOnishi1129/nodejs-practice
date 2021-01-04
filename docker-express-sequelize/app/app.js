const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const mysql = require("mysql");

// テンプレートエンジン追加
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: "db", // Docker上ではlocalhostに接続してはいけない
  user: "root",
  password: "pass",
  database: "DB_EXPRESS",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

/**
 * select処理
 */
app.get("/", (req, res) => {
  res.send("こんにちは");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
