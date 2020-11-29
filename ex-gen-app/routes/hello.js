const express = require('express');
const router = express.Router();

// 第一引数に'/'を指定する理由
// → app.jsで指定した'/hello'の後に続くパスを示す
router.get('/', (req, res, next) => {
  // GETのクエリーパラメータを取得
  //   var name = req.query.name;
  //   var mail = req.query.mail;
  var msg = '※何か書いて送信して下さい。';
  //   sessionの値をセット
  if (req.session.message != undefined) {
    msg = 'Last Message: ' + req.session.message;
  }
  var data = {
    title: 'Hello!',
    content: msg,
  };
  res.render('hello', data);
});

router.post('/post', (req, res, next) => {
  // POST送信された値を取得する
  var msg = req.body['message'];
  // sessionにPOSTの値をセット
  req.session.message = msg;
  var data = {
    title: 'Hello!',
    content: 'Last Message: ' + req.session.message,
  };
  res.render('hello', data);
});

module.exports = router;
