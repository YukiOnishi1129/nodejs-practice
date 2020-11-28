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
  Taro: '09-999-99',
  Hanako: '08-888-88',
  Sachiko: '07-777-77',
  Ichiro: '06-666-66',
};

/**
 * indexのアクセス処理
 * @param {*} request
 * @param {*} response
 */
const response_index = (request, response) => {
  var msg = 'これはIndexページです。';
  var content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: data,
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
};

/**
 * otherのアクセス処理
 * @param {*} request
 * @param {*} response
 */
const response_other = (request, response) => {
  var msg = 'これはOtherページです。';

  // POSTアクセス処理
  if (request.method == 'POST') {
    var body = '';

    // データ受診のイベント処理
    // data: クライアントからデータを受け取ると発生するイベント
    request.on('data', (data) => {
      body += data;
    });

    // データ受診終了のイベント処理
    // end: データの受け取りが完了したら発生するイベント
    request.on('end', () => {
      // qs.parseでデータをエンコードし、オブジェクトに変換
      var post_data = qs.parse(body);
      msg += 'あなたは、「' + post_data.msg + '」と書きました。';
      var content = ejs.render(other_page, {
        title: 'Other',
        content: msg,
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(content);
      response.end();
    });
  } else {
    var msg = 'ページがありません。';
    var content = ejs.render(other_page, {
      title: 'Other',
      content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
  }
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
