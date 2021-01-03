// サーバーとして機能する
const express = require('express')
// app変数でwebサーバー機能を編集する
const app = express()

app.get('/', (req, res) => {
  // HTMLを送信できる
  res.send('<h1>Hello, Express!</h1>')
})

app.get('/about', (req, res) => {
  // jsonを送信できる
  res.send({
    name: '太郎',
    age: 20,
  })
})

app.listen(3000)
