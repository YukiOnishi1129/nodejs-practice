const http = require('http');
const fs = require('fs');
// ejsオブジェクトの読み込み
const ejs = require('ejs');
// urlオブジェクトの読み込み
const url = require('url');
const qs = require('querystring');
// テンプレートファイルの読み込み
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

var data = {
  msg: 'no message...',
};

var data2 = {
  Taro: ['taro@yamada', '09-999-999', 'Tokyo'],
  Hanako: ['hanako@flower', '080-888-888', 'Yokohama'],
  Sachiko: ['sachi@happy', '070-777-777', 'Nagoya'],
  Ichiro: ['ichi@baseball', '060-666-666', 'USA'],
};

/**
 * indexのアクセス処理
 * @param {*} request
 * @param {*} response
 */
const response_index = (request, response) => {
  // POSTアクセス時の処理
  if (request.method == 'POST') {
    var body = '';

    // データ受信のイベント処理
    request.on('data', (data) => {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on('end', () => {
      data = qs.parse(body); // ★データのパース
      // クッキーの保存
      setCookie('msg', data.msg, response);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
};

/**
 * indexのページ作成
 * @param {*} request
 * @param {*} response
 */
const write_index = (request, response) => {
  var msg = '※伝言を表示します。';
  var cookie_data = getCookie('msg', request);
  var content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: data,
    cookie_data: cookie_data,
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
};

/**
 * クッキーの値を設定
 * @param {} key
 * @param {*} value
 * @param {*} response
 */
const setCookie = (key, value, response) => {
  // クッキーに保存できる形式に整形
  var cookie = escape(value);
  // responseのヘッダー情報に格納
  // cookieは[キー=値]の形式で保存する
  response.setHeader('Set-Cookie', [key + '=' + cookie]);
};

/**
 * クッキーの値を取得
 * @param {*} key
 * @param {*} request
 */
const getCookie = (key, request) => {
  // クライアントから送られてくるcookie情報をrequestから取り出す
  var cookie_data =
    request.headers.cookie != undefined ? request.headers.cookie : '';
  // cookieを分解
  var data = cookie_data.split(';');
  for (var i in data) {
    // trimし、[key=]の形式で始まっているか判定
    if (data[i].trim().startsWith(key + '=')) {
      var result = data[i].trim().substring(key.length + 1);
      // unescapeでcookie形式から普通のテキストに変換
      return unescape(result);
    }
  }
  return '';
};

/**
 * otherのアクセス処理
 * @param {*} request
 * @param {*} response
 */
const response_other = (request, response) => {
  var msg = 'これはOtherページです。';
  var content = ejs.render(other_page, {
    title: 'Other',
    content: msg,
    data: data2,
    filename: 'data_item',
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
};

/**
 * createServerの処理
 * @param {*} request
 * @param {*} response
 */
const getFromClient = (request, response) => {
  // 第２引数にtrueをつけると、クエリーパラメータもパースされる
  var url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case '/':
      response_index(request, response);
      break;

    case '/other':
      response_other(request, response);
      break;

    case '/style.css':
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
};

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');
