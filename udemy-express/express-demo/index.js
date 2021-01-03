const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const Joi = require('joi')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/courses', (req, res) => {
  res.send(courses)
})

app.post('/courses', (req, res) => {
  //   if (!req.body.name || req.body.length < 3) {
  //     // res.send('入力必須、かつ3文字以上')
  //     res.status(400)
  //   }
  // Joiを使ったバリデーション
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })
  let result = schema.validate(req.body)
  if (result.error) {
    res.send(result.error.details[0].message)
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  res.send(courses)
})

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
