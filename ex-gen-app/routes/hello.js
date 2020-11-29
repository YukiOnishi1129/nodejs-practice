const express = require('express');
const router = express.Router();

// 第一引数に'/'を指定する理由
// → app.jsで指定した'/hello'の後に続くパスを示す
router.get('/', (req, res, next) => {
  // GETのクエリーパラメータを取得
  //   var name = req.query.name;
  //   var mail = req.query.mail;
  var data = {
    title: 'Hello!',
    content: '※何か書いて送信して下さい。',
  };
  res.render('hello', data);
});

router.post('/post', (req, res, next) => {
  // POST送信された値を取得する
  var msg = req.body['message'];
  var data = {
    title: 'Hello!',
    content: 'あなたは、「' + msg + '」と送信しました。',
  };
  res.render('hello', data);
});

module.exports = router;
