const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// app.get('/courses', (req, res) => {
//   res.send(courses)
// })

app.get('/courses/:id', (req, res) => {
  let course = courses.find((e) => e.id === parseInt(req.params.id))
  if (!course) {
    res.send('該当のidのコースが見つかりません。')
  }
  res.send(course)
})

app.get('/port/:year/:month', (req, res) => {
  // /:idなどがreq.params.id
  //  ?name=1などはreq.queryでjson形式で取得できる
  res.send(req.query)
})

app.listen(port, () => {
  console.log(`ポート番号${port}で立ち上がります。`)
})
