const http = require('http');
const fs = require('fs');
// ejsオブジェクトの読み込み
const ejs = require('ejs');
// テンプレートファイルの読み込み
const index_page = fs.readFileSync('./index.ejs', 'utf8');

const getFromClient = (request, response) => {
  // レンダリングの実行
  var content = ejs.render(index_page, {
    title: 'Indexページ',
    content: 'これはテンプレートを使ったサンプルページです。',
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
};

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');
