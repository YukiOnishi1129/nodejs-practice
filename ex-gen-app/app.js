var createError = require('http-errors');
var express = require('express');
var path = require('path'); // ファイルパスを扱う
var cookieParser = require('cookie-parser'); //cookieの変換に関するモジュール
var logger = require('morgan'); // httpリクエストをログに出すモジュール

// ルート用のモジュールをロード
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');

var app = express();

// view engine setup
// views: テンプレートエンジンが保管されている場所
app.set('views', path.join(__dirname, 'views'));
// view engine: テンプレートエンジンの種類
app.set('view engine', 'ejs');

// app.use: アプリケーションを利用する関数を設定するもの
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 特定のアドレスにアクセスした時の処理を設定
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 設定したオブジェクト(app)を外部からアクセスできるようにする
module.exports = app;
