const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;
const sqlite3 = require('sqlite3');
// データベースオブジェクトの取得
const db = new sqlite3.Database('mydb.sqlite3');

const { check, validationResult } = require('express-validator');
const { notEqual } = require('assert');

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
          res.render('hello/index', data);
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

/**
 * 新規作成画面
 */
router.get('/add', (req, res, next) => {
  var data = {
    title: 'Hello/Add',
    content: '新しいレコードを入力：',
    form: { name: '', mail: '', age: 0 },
  };
  res.render('hello/add', data);
});

/**
 * 新規作成のPOST処理
 */
router.post(
  '/add',
  [
    // チェック項目を追加
    check('name', 'NAME は必ず入力して下さい。').notEmpty().escape(),
    check('mail', 'MAIL はメールアドレスを記入して下さい。').isEmail().escape(),
    check('age', 'AGE は年齢（整数）を入力下さい。').isInt(),
    check('age', 'AGEは0以上120以下で入力ください。').custom((value) => {
      return value >= 0 && value <= 120;
    }),
  ],
  (req, res, next) => {
    // バリデーション実行
    const errors = validationResult(req);

    // エラーがあるかチェック
    if (!errors.isEmpty()) {
      var result = '<ul class="text-danger">';
      var result_arr = errors.array();
      for (var n in result_arr) {
        result += '<li>' + result_arr[n].msg + '</li>';
      }
      result += '</ul>';
      var data = {
        title: 'Hello/Add',
        content: result,
        form: req.body,
      };
      res.render('hello/add', data);
    } else {
      var nm = req.body.name;
      var ml = req.body.mail;
      var ag = req.body.age;
      db.serialize(() => {
        db.run(
          'insert into mydata (name, mail, age) values (?, ?, ?)',
          nm,
          ml,
          ag
        );
      });
      res.redirect('/hello');
    }
  }
);

/**
 * 一覧表示
 */
router.get('/show', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = 'select * from mydata where id = ?';
    // db.get: 第１引数 クエリー, 第２引数 ?に渡す配列
    // db.allとの違いは「得られるレコードは1行だけ」(複数行当てはまると最初の1行のみ)
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: 'Hello/show',
          content: 'id = ' + id + 'レコード：',
          mydata: row,
        };
        res.render('hello/show', data);
      }
    });
  });
});

/**
 * 編集画面表示
 */
router.get('/edit', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = 'select * from mydata where id = ?';
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: 'hello/edit',
          content: 'id = ' + id + ' のレコードを編集：',
          mydata: row,
        };
        res.render('hello/edit', data);
      }
    });
  });
});

/**
 * 編集処理
 */
router.post('/edit', (req, res, next) => {
  const id = req.body.id;
  const nm = req.body.name;
  const ml = req.body.mail;
  const ag = req.body.age;
  const q = 'update mydata set name = ?, mail = ?, age = ? where id = ?';
  db.serialize(() => {
    db.run(q, nm, ml, ag, id);
  });
  res.redirect('/hello');
});

/**
 * 削除画面
 */
router.get('/delete', (req, res, next) => {
  const id = req.query.id;
  db.serialize(() => {
    const q = 'select * from mydata where id = ?';
    db.get(q, [id], (err, row) => {
      if (!err) {
        var data = {
          title: 'Hello/Delete',
          content: 'id = ' + id + ' のレコードを削除：',
          mydata: row,
        };
        res.render('hello/delete', data);
      }
    });
  });
});

/**
 * 削除処理
 */
router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  db.serialize(() => {
    const q = 'delete from mydata where id = ?';
    db.run(q, id);
  });
  res.redirect('/hello');
});

/**
 * 検索画面
 */
router.get('/find', (req, res, next) => {
  db.serialize(() => {
    db.all('select * from mydata', (err, rows) => {
      if (!err) {
        var data = {
          title: 'Hello/find',
          find: '',
          content: '検索条件を入力してください。',
          mydata: rows,
        };
        res.render('hello/find', data);
      }
    });
  });
});

/**
 * 検索処理
 */
router.post('/find', (req, res, next) => {
  var find = req.body.find;
  db.serialize(() => {
    var q = 'select * from mydata where ';
    db.all(q + find, [], (err, rows) => {
      if (!err) {
        var data = {
          title: 'Hello/find',
          find: find,
          content: '検索条件 ' + find,
          mydata: rows,
        };
        res.render('hello/find', data);
      }
    });
  });
});

module.exports = router;
