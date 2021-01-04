const express = require("express");
const db = require("./models/index"); // cliでinitした時に作成されるmodels配下のindex.js
const app = express();
const port = 3000;

app.get("/users", (req, res) => {
  db.user.findAll({}).then((instances) => {
    console.log(instances);
    res.send(instances);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
