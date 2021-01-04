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

module.exports = router;
