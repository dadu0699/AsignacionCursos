var express = require('express');
var curso = require('../model/curso');
var router = express.Router();

router.get('/api/curso/', function (req, res) {
  curso.selectAll(function (error, resultados) {
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({
        "Mensaje": "No hay cursos"
      });
    }
  });
});

router.get('/api/curso/:idCurso',
  function (req, res) {
    var idCurso = req.params.idCurso;
    curso.select(idCurso,
      function (error, resultados) {
        if (typeof resultados !== undefined) {
          res.json(resultados);
        } else {
          res.json({
            "Mensaje": "No hay cursos"
          });
        }
      });
  });

router.post('/api/curso', function (req, res) {
  var data = {
    nombreCurso: req.body.nombreCurso
  }
  curso.insert(data, function (err, resultado) {
    if (resultado && resultado.insertId > 0) {
      res.redirect('/api/curso');
    } else {
      res.json({
        "Mensaje": "No se ingreso el curso"
      });
    }
  });
});

module.exports = router;