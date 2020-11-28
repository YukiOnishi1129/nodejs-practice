const http = require('http');
const fs = require('fs');
// ejsオブジェクトの読み込み
const ejs = require('ejs');
// urlオブジェクトの読み込み
const url = require('url');
// テンプレートファイルの読み込み
const index_page = fs.readFileSync('./index.ejs', 'utf8');
const other_page = fs.readFileSync('./other.ejs', 'utf8');
const style_css = fs.readFileSync('./style.css', 'utf8');

const getFromClient = (request, response) => {
  // 第２引数にtrueをつけると、クエリーパラメータもパースされる
  var url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case '/':
      var subscribe = 'これはIndexページです。';
      var query = url_parts.query;
      if (query.msg != undefined) {
        subscribe += 'あなたは、「' + query.msg + '」お送りしました。';
      }
      // レンダリングの実行
      var content = ejs.render(index_page, {
        title: 'Index',
        content: subscribe,
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(content);
      response.end();
      break;

    case '/other':
      var content = ejs.render(other_page, {
        title: 'Other',
        content: 'これはOtherページです。',
      });
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(content);
      response.end();
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
