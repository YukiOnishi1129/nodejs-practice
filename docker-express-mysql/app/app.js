const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "db", // Docker上ではlocalhostに接続してはいけない
  user: "root",
  password: "pass",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected");
});

app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
