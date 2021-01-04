"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Hello, World!");
});
// サーバを起動する (ユニットテスト時は実行されないようにする)
if (!module.children) {
    app.listen(8080, function () {
        console.log("Server Started");
    });
}
// ユニットテスト用に export する
exports.default = app;
