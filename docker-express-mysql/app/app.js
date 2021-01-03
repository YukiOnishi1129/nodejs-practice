const { query } = require("express");
const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");

const con = mysql.createConnection({
  host: "db", // Docker上ではlocalhostに接続してはいけない
  user: "root",
  password: "pass",
  database: "DB_EXPRESS",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
  //  table作成
  // const sql =
  //   "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
  // con.query(sql, (err, result) => {
  //   if (err) throw err;
  //   console.log("table created");
  // });
});

app.get("/", (req, res) => {
  const sql = "select * from users";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
