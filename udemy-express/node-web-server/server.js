// サーバーとして機能する
const express = require('express')
// app変数でwebサーバー機能を編集する
const app = express()

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(3000)
