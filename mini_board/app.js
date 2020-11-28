const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'utf8');
const login_page = fs.readFileSync('./login.ejs', 'utf8');

const max_num = 10; // 最大保管数
const filename = 'mydata.txt'; // データファイル名
var message_data; // データ

/**
 * loginのアクセス処理
 * @param {*} request
 * @param {*} response
 */
const response_login = (request, response) => {
  var content = ejs.render(login_page, {});
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
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
    request.on('data', function (data) {
      body += data;
    });

    // データ受信終了のイベント処理
    request.on('end', function () {
      data = qs.parse(body);
      addToData(data.id, data.msg, filename, request);
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
  var msg = '※何かメッセージを書いて下さい。';
  var content = ejs.render(index_page, {
    title: 'Index',
    content: msg,
    data: message_data,
    filename: 'data_item',
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(content);
  response.end();
};

/**
 * テキストファイルをロード
 * @param {*} fname
 */
const readFromFile = (fname) => {
  fs.readFile(fname, 'utf8', (err, data) => {
    // ['\n']で改行区切りでテキストを分割し配列に整形
    message_data = data.split('\n');
  });
};

/**
 * データを更新
 * @param {*} id
 * @param {*} msg
 * @param {*} fname
 * @param {*} request
 */
const addToData = (id, msg, fname, request) => {
  var obj = { id: id, msg: msg };
  // オブジェクトをJSON形式のテキストに変換
  // stringfyはparseと反対の働き
  var obj_str = JSON.stringify(obj);
  console.log('add data: ' + obj_str);
  // unshift: 配列の最初に値を追加する
  message_data.unshift(obj_str);
  if (message_data.length > max_num) {
    // 配列の最後のデータを削除
    message_data.pop();
  }
  saveToFile(fname);
};

/**
 * データを保存
 * @param {*} fname
 */
const saveToFile = (fname) => {
  // 配列をテキストに変換(改行したテキストにする)
  var data_str = message_data.join('\n');
  //   writeFile: 第１引数(保存するファイル名) 第2引数(保存するテキスト)
  fs.writeFile(fname, data_str, (err) => {
    if (err) {
      throw err;
    }
  });
};

readFromFile(filename);

/**
 * createServerの処理
 * @param {*} request
 * @param {*} response
 */
const getFormClient = (request, response) => {
  var url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case '/': // トップページ（メッセージボード）
      response_index(request, response);
      break;

    case '/login': // ログインページ
      response_login(request, response);
      break;

    default:
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('no page...');
      break;
  }
};

var server = http.createServer(getFormClient);

server.listen(3000);
console.log('Server start!');
