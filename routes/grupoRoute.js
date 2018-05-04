var express = require('express');
var grupo = require('../model/grupo');
var router = express.Router();

router.get('/api/grupo/', function (req, res) {
  grupo.selectAll(function (error, resultados) {
    if (typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({
        "Mensaje": "No hay grupos"
      });
    }
  });
});

router.get('/api/grupo/:idGrupo',
  function (req, res) {
    var idGrupo = req.params.idGrupo;
    grupo.select(idGrupo,
      function (error, resultados) {
        if (typeof resultados !== undefined) {
          res.json(resultados);
        } else {
          res.json({
            "Mensaje": "No hay grupos"
          });
        }
      });
  });

router.post('/api/grupo', function (req, res) {
  var data = {
    nombreGrupo: req.body.nombreGrupo
  }
  grupo.insert(data, function (err, resultado) {
    if (resultado && resultado.insertId > 0) {
      res.redirect('/api/grupo');
    } else {
      res.json({
        "Mensaje": "No se ingreso el grupo"
      });
    }
  });
});

module.exports = router;