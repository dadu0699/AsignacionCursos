var database = require('./database');
var grupo = {};

grupo.selectAll = function (callback) {
  if (database) {
    database.query("SELECT * FROM Grupo",
      function (error, resultados) {
        if (error) {
          throw error;
        } else {
          callback(null, resultados);
        }
      });
  }
}

grupo.select = function (idGrupo, callback) {
  if (database) {
    var sql = "SELECT * FROM vista_CursosG WHERE idGrupo = ?";
    database.query(sql, idGrupo,
      function (error, resultado) {
        if (error) {
          throw error;
        } else {
          callback(null, resultado);
        }
      });
  }
}

grupo.insert = function (data, callback) {
  if (database) {
    database.query("CALL insertarGrupo(?)", data.nombreGrupo,
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

module.exports = grupo;