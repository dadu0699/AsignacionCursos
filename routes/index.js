var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Grupos'
  });
});

router.get('/cursos', function (req, res, next) {
  res.render('cursos', {
    title: 'Cursos'
  });
});

module.exports = router;