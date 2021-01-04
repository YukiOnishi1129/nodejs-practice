const express = require("express");
const router = express.Router();
const db = require("../models/index"); // cliでinitした時に作成されるmodels配下のindex.js

/**
 * user情報取得API
 */
router.get("/", (req, res) => {
  db.user.findAll({}).then((instances) => {
    console.log(instances);
    res.send(instances);
  });
});

/**
 * user登録処理
 */
router.post("/new", (req, res) => {
  // if (!req.body.name || !req.body.age) {
  //   return res.status(400).send("400エラーです。");
  // }
  // db.sequelize.sync(): データ更新系はこちらを実装
  // 外部から同時アクセスによってデータに不具合が生じる場合がある
  // sync()によって、全てのモデルを同期して処理する(データ更新系を全て一括で実施する)
  db.sequelize
    .sync()
    .then(() =>
      db.user.create({
        user_name: req.body.name,
        age: req.body.age,
      })
    )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      // バリデーションエラーがある場合
      if (err.name === "SequelizeValidationError") {
        const validErr = err.errors.map((err) => err.message);
        return res.status(400).send(validErr);
      }
      res.status(500).send(err);
    });
});

module.exports = router;
