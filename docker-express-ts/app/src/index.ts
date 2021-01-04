import express = require("express"); // こうしないとtsエラー

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// サーバを起動する (ユニットテスト時は実行されないようにする)
if (!process.env.NODE_TEST) {
  app.listen(PORT, () => {
    console.log("Server Started");
  });
}

// ユニットテスト用に export する
export default app;
