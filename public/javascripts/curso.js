var ModelCurso = function () {
  var main = this;
  var cursoUri = 'api/curso/';
  var grupoUri = 'api/grupo/';
  var grupoCursoUri = 'api/cursoGrupo/';

  main.cursos = ko.observableArray([]);
  main.grupos = ko.observableArray([]);
  main.cursoGrupos = ko.observableArray([]);
  main.error = ko.observable();
  main.cursoGrupoCargado = ko.observable();
  main.cursoCargado = ko.observable();
  main.cursoNuevo = {
    nombreCurso: ko.observable()
  }
  main.cursoGrupoNuevo = {
    Grupo: ko.observable()
  }

  //MOSTRAR
  main.getAllCursos = function () {
    ajaxHelper(cursoUri, 'GET').done(function (data) {
      limpiar();
      main.cursos(data);
    });
  }

  main.getAllGrupos = function () {
    ajaxHelper(grupoUri, 'GET').done(function (data) {
      limpiar();
      main.grupos(data);
    });
  }

  main.getGrupos = function (item) {
    main.cursoGrupoCargado(item);
    var curso = {
      idCurso: main.cursoGrupoCargado().idCurso
    }
    var uriGrupos = cursoUri + curso.idCurso;

    ajaxHelper(uriGrupos, 'GET').done(function (data) {
      limpiar();
      main.cursoGrupos(data);
    });
  }

  //AGREGAR
  main.agregar = function () {
    var curso = {
      nombreCurso: main.cursoNuevo.nombreCurso().trim()
    }
    ajaxHelper(cursoUri, 'POST', curso).done(function (data) {
      main.getAllCursos();
    });
  }

  main.agregarCursoG = function () {
    var curso = {
      idCurso: main.cursoCargado().idCurso,
      idGrupo: main.cursoGrupoNuevo.Grupo().idGrupo
    }
    ajaxHelper(grupoCursoUri, 'POST', curso).done(function (data) {
      main.getAllGrupos();
    });
  }

  //CARGAR
  main.cargar = function (item) {
    main.cursoCargado(item);
  }

  //AJAXHELPER
  function ajaxHelper(uri, method, data) {
    return $.ajax({
      type: method,
      url: uri,
      dataType: 'json',
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {
      main.error(errorThrown);
    });
  }

  //LIMPIAR
  function limpiar() {
      main.cursoNuevo.nombreCurso(null);
      $('#modalAgregarCurso').modal('hide');
      $('#modalAgregarGrupo').modal('hide');
  }

  main.getAllCursos();
  main.getAllGrupos();
}

$(document).ready(function () {
  var modelCurso = new ModelCurso();
  ko.applyBindings(modelCurso);
});
