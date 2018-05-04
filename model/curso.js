var database = require('./database');
var curso = {};

curso.selectAll = function (callback) {
  if (database) {
    database.query("SELECT * FROM Curso",
      function (error, resultados) {
        if (error) {
          throw error;
        } else {
          callback(null, resultados);
        }
      });
  }
}

curso.select = function (idCurso, callback) {
  if (database) {
    var sql = "SELECT * FROM vista_GruposC WHERE idCurso = ?";
    database.query(sql, idCurso,
      function (error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, resultado);
        }
      });
  }
}

curso.insert = function (data, callback) {
  if (database) {
    database.query("CALL insertarCurso(?)", data.nombreCurso,
      function (error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, {
            "insertId": resultado.insertId
          });
        }
      });
  }
}

module.exports = curso;