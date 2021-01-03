const express = require('express')
const app = express()
c
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`ポート番号${port}で立ち上がります。`)
})
