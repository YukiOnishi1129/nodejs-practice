var express = require('express');
var router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // const min = req.query.min * 1;
  // const max = req.query.max * 1;
  db.User.findAll({
    // where: {
    //   age: { [Op.gte]: min, [Op.lte]: max },
    // },
  }).then((users) => {
    var data = {
      title: 'Users/Index',
      content: users,
    };
    res.render('users/index', data);
  });
});

/**
 * ログイン画面
 */
router.get('/login', (req, res, next) => {
  var data = {
    title: 'Users/Login',
    content: '名前とパスワードを入力ください。',
  };
  res.render('users/login', data);
});

/**
 * ログイン処理
 */
router.post('/login', (req, res, next) => {
  db.User.findOne({
    where: {
      name: req.body.name,
      pass: req.body.pass,
    },
  }).then((usr) => {
    console.log('ログインあった');
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null) {
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title: 'Users/Login',
        content: '名前かパスワードに間違いがあります。再入力してください。',
      };
      res.render('users/login', data);
    }
  });
});

/**
 * 新規追加画面
 */
router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add',
    form: new db.User(),
    err: null, //バリデーションエラーが発生した時のエラーオブジェクト
  };
  res.render('users/add', data);
});

/**
 * 新規追加処理
 */
router.post('/add', (req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age,
  };
  db.sequelize
    // sync: 全てのモデルを同期して処理する(複数アクセスが実行されるのを防ぐ)
    .sync()
    .then(() => db.User.create(form))
    .then((usr) => {
      res.redirect('/users');
    })
    .catch((err) => {
      var data = {
        title: 'Users/Add',
        form: form,
        err: err,
      };
      res.render('users/add', data);
    });
});

/**
 * 編集画面
 */
router.get('/edit', (req, res, next) => {
  // findByPk: 指定したIDのモデルを取得する
  db.User.findByPk(req.query.id).then((usr) => {
    var data = {
      title: 'User/Edit',
      form: usr,
    };
    res.render('users/edit', data);
  });
});

/**
 * 編集処理
 */
router.post('/edit', (req, res, next) => {
  db.sequelize
    .sync()
    .then(() => {
      // whereで指定したレコードがない場合、エラーにならず何もしないで終了する
      db.User.update(
        {
          name: req.body.name,
          pass: req.body.pass,
          mail: req.body.mail,
          age: req.body.age,
        },
        {
          where: { id: req.body.id },
        }
      );
    })
    .then((usr) => {
      res.redirect('/users');
    });
});

/**
 * 削除画面
 */
router.get('/delete', (req, res, next) => {
  db.User.findByPk(req.query.id).then((usr) => {
    var data = {
      title: 'Users/Delete',
      form: usr,
    };
    res.render('users/delete', data);
  });
});

/**
 * 削除処理
 */
router.post('/delete', (req, res, next) => {
  db.sequelize
    .sync()
    .then(() => {
      db.User.destroy({
        where: { id: req.body.id },
      });
    })
    .then((usr) => {
      res.redirect('/users');
    });
});

module.exports = router;
