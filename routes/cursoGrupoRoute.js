var express = require('express');
var cursoGrupo = require('../model/cursoGrupo');
var router = express.Router();

router.post('/api/cursoGrupo', function (req, res) {
  var data = {
    idGrupo: req.body.idGrupo,
    idCurso: req.body.idCurso
  }
  cursoGrupo.insert(data, function (err, resultado) {
    if (resultado && resultado.insertId > 0) {
      res.redirect('/api/cursoGrupo');
    } else {
      res.json({
        "Mensaje": "No se ingreso el cursoGrupo"
      });
    }
  });
});

module.exports = router;