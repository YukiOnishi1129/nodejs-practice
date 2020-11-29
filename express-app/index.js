// expressオブジェクトの用意
const express = require('express');
// アプリケーションオブジェクト作成
var app = express();

// ルーティング設定
// get: getアクセスを設定
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

// 待ち受け開始
// listen: 待ち受け開始
app.listen(3000, () => {
  console.log('Start server port:3000');
});
