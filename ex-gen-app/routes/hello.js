const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;
const sqlite3 = require('sqlite3');
// データベースオブジェクトの取得
const db = new sqlite3.Database('mydb.sqlite3');

// 第一引数に'/'を指定する理由
// → app.jsで指定した'/hello'の後に続くパスを示す
router.get('/', (req, res, next) => {
  // データベースのシリアライズ(用意された処理を順番に実行する)
  db.serialize(() => {
    // レコードを全て取り出す
    // db.all('select * from mydata', (err, rows) => {
    //   // データベースアクセス完了時の処理
    //   if (!err) {
    //     var data = {
    //       title: 'Hello!',
    //       content: rows, //取得したレコードデータ
    //     };
    //     res.render('hello', data);
    //   }
    // });
    var rows = '';
    // レコードを順に取り出す
    db.each(
      'select * from mydata',
      // レコードが1行ずつrowに渡される
      (err, row) => {
        if (!err) {
          rows +=
            '<tr><th>' + row.id + '</th><td>' + row.name + '</td><td></tr>';
        }
      },
      // db.eachを使う場合は、2つ目の関数でレンダリングを実施する
      (err, count) => {
        if (!err) {
          var data = {
            title: 'Hello!',
            content: rows,
          };
          res.render('hello', data);
        }
      }
    );
  });

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
  //   var opt = {
  //     host: 'news.google.com',
  //     port: 443, //HTTPSの場合は443
  //     path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja',
  //   };
  //   // サイトへアクセス
  //   http.get(opt, (res2) => {
  //     var body = '';
  //     res2.on('data', (data) => {
  //       body += data;
  //     });
  //     res2.on('end', () => {
  //       // XMLデータをパースする(変換)
  //       parseString(body.trim(), (err, result) => {
  //         console.log(result);
  //         var data = {
  //           title: 'Google News',
  //           content: result.rss.channel[0].item,
  //         };
  //         res.render('hello', data);
  //       });
  //     });
  //   });
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
