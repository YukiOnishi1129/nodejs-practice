const { query } = require("express");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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
  // console.log("Connected");
  //  table作成
  // const sql =
  //   "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
  // con.query(sql, (err, result) => {
  //   if (err) throw err;
  //   console.log("table created");
  // });
});

/**
 * select処理
 */
app.get("/", (req, res) => {
  const sql = "select * from users";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.render("index", { users: result });
  });
});

// app.get("/insert", (req, res) => {
//   const sql = "INSERT INTO users(name,email) VALUES(?,?)";
//   con.query(sql, ["Jack", "jack@exsample.co.jp"], (err, result, fields) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

/**
 * 新規作成画面へ遷移
 */
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "html/form.html"));
});

// 編集画面へ遷移
app.get("/edit/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    res.render("edit", { user: result });
  });
});

/**
 * insert処理
 */
app.post("/form", (req, res) => {
  const sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, (err, result, fields) => {
    if (err) throw err;
    // console.log(result);
    // res.send("登録が完了しました");
    res.redirect("/");
  });
});

/**
 * 更新処理
 */
app.post("/update/:id", (req, res) => {
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  con.query(sql, req.body, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

/**
 * 削除処理
 */
app.get("/delete/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
