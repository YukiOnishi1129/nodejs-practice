const express = require('express');
const router = express.Router();

// 第一引数に'/'を指定する理由
// → app.jsで指定した'/hello'の後に続くパスを示す
router.get('/', (req, res, next) => {
  var data = {
    title: 'Hello!',
    content: 'これは、サンプルのコンテンツです。<br>this is sample content.',
  };
  res.render('hello', data);
});

module.exports = router;
