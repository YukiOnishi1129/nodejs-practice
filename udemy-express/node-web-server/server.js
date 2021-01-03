// サーバーとして機能する
const express = require('express')
// app変数でwebサーバー機能を編集する
const app = express()
const hbs = require('hbs')

// View engineのset
app.set('view engine', 'hbs')

// ミドルウェア(middleware)
// express.static(): 静的ファイル
// __dirname: nodeアプリの根っこのパス
// public直下のファイルにアクセスできるようになる(htmlファイルとか)
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // HTMLを送信できる
  res.send('<h1>Hello, Express!</h1>')
})

app.get('/about', (req, res) => {
  // レンダリング処理
  // viewsディレクトリにある場合にのみ、ファイル名のみで記述できる
  res.render('about.hbs', {
    pageTitle: 'About Page',
    content: 'コンテンツです。',
    currentYear: new Date().getFullYear(),
  })
  // jsonを送信できる
  //   res.send({
  //     name: '太郎',
  //     age: 20,
  //   })
})

app.listen(3000)
