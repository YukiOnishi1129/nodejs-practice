require("module-alias/register");
import express = require("express"); // こうしないとtsエラー
import { JobAction } from "@Jobs/index";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ジョブスケジューリング
JobAction();

// サーバを起動する (ユニットテスト時は実行されないようにする)
if (!process.env.NODE_TEST) {
  app.listen(PORT, () => {
    console.log("Server Started");
  });
}

// ユニットテスト用に export する
export default app;
