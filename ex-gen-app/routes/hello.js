const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;

// 第一引数に'/'を指定する理由
// → app.jsで指定した'/hello'の後に続くパスを示す
router.get('/', (req, res, next) => {
  // GETのクエリーパラメータを取得
  //   var name = req.query.name;
  //   var mail = req.query.mail;
  //   var msg = '※何か書いて送信して下さい。';
  //   //   sessionの値をセット
  //   if (req.session.message != undefined) {
  //     msg = 'Last Message: ' + req.session.message;
  //   }
  //   var data = {
  //     title: 'Hello!',
  //     content: msg,
  //   };
  var opt = {
    host: 'news.google.com',
    port: 443, //HTTPSの場合は443
    path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja',
  };
  // サイトへアクセス
  http.get(opt, (res2) => {
    var body = '';
    res2.on('data', (data) => {
      body += data;
    });
    res2.on('end', () => {
      // XMLデータをパースする(変換)
      parseString(body.trim(), (err, result) => {
        console.log(result);
        var data = {
          title: 'Google News',
          content: result.rss.channel[0].item,
        };
        res.render('hello', data);
      });
    });
  });
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
