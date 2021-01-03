const express = require('express')
// routerにAPIの処理を記載
const router = express.Router()
const Joi = require('joi')

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.get('/port/:year/:month', (req, res) => {
  // /:idなどがreq.params.id
  //  ?name=1などはreq.queryでjson形式で取得できる
  res.send(req.query)
})

/**
 * コース取得
 */
router.get('/courses', (req, res) => {
  res.send(courses)
})

/**
 * 指定したIDのコース取得
 */
router.get('/courses/:id', (req, res) => {
  let course = findCourse(req.params.id)
  if (!course) {
    res.send('該当のidのコースが見つかりません。')
  }
  res.send(course)
})

/**
 * コース登録
 */
router.post('/courses', (req, res) => {
  //   if (!req.body.name || req.body.length < 3) {
  //     // res.send('入力必須、かつ3文字以上')
  //     res.status(400)
  //   }
  let { error } = validate(req.body)

  if (error) {
    res.send(error.details[0].message)
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name,
  }
  courses.push(course)
  res.send(courses)
})

/**
 * コース編集
 */
router.put('/courses/:id', (req, res) => {
  // 1. データ(course)を探す
  let course = findCourse(req.params.id)
  if (!course) {
    res.send('該当のidのコースが見つかりません。')
  }
  // 2. バリデーションを実施
  let { error } = validate(req.body)

  if (error) {
    res.send(error.details[0].message)
  }
  // データを編集し、結果を返す
  courses.forEach((e) => {
    if (e.id === parseInt(req.params.id)) e.name = req.body.name
  })
  res.send(courses)
})

/**
 * コース削除
 */
router.delete('/courses/:id', function (req, res) {
  console.log('aaaa')
  // 1. 該当のコースデータの検索
  let course = findCourse(req.params.id)
  if (!course) {
    res.send('該当のidのコースが見つかりません。')
  }
  // 2. 削除
  let index = courses.indexOf(course)
  courses.splice(index, 1)
  // 3. 結果を返す
  res.send(courses)
})

/**
 * コース検索処理
 * @param {*} id
 */
const findCourse = (id) => {
  return courses.find((e) => e.id === parseInt(id))
}

/**
 * バリデーション処理
 * @param {*} course
 */
const validate = (course) => {
  // Joiを使ったバリデーション
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })
  return schema.validate(course)
}

// 最後の行で代入
module.exports = router
