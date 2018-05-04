var database = require('./database');
var cursoGrupo = {};

cursoGrupo.insert = function (data, callback) {
  if (database) {
    var sql = "CALL insertarCursoGrupo(?, ?)";
    database.query(sql, [data.idGrupo, data.idCurso],
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

module.exports = cursoGrupo;