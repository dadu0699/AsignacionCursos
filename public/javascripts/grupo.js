var ModelGrupo = function () {
  var main = this;
  var grupoUri = 'api/grupo/';
  var cursoUri = 'api/curso/';
  var grupoCursoUri = 'api/cursoGrupo/';

  main.grupos = ko.observableArray([]);
  main.cursos = ko.observableArray([]);
  main.grupoCursos = ko.observableArray([]);
  main.error = ko.observable();
  main.grupoCursoCargado = ko.observable();
  main.grupoCargado = ko.observable();
  main.grupoNuevo = {
    nombreGrupo: ko.observable()
  }
  main.grupoCursoNuevo = {
    Curso: ko.observable()
  }

  //MOSTRAR
  main.getAllGrupos = function () {
    ajaxHelper(grupoUri, 'GET').done(function (data) {
      limpiar();
      main.grupos(data);
    });
  }

  main.getAllCursos = function () {
    ajaxHelper(cursoUri, 'GET').done(function (data) {
      limpiar();
      main.cursos(data);
    });
  }

  main.getCursos = function (item) {
    main.grupoCursoCargado(item);
    var grupo = {
      idGrupo: main.grupoCursoCargado().idGrupo
    }
    var uriCursos = grupoUri + grupo.idGrupo;

    ajaxHelper(uriCursos, 'GET').done(function (data) {
      limpiar();
      main.grupoCursos(data);
    });
  }

  //AGREGAR
  main.agregar = function () {
    var grupo = {
      nombreGrupo: main.grupoNuevo.nombreGrupo().trim()
    }
    ajaxHelper(grupoUri, 'POST', grupo).done(function (data) {
      main.getAllGrupos();
    });
  }

  main.agregarGrupoC = function () {
    var grupo = {
      idGrupo: main.grupoCargado().idGrupo,
      idCurso: main.grupoCursoNuevo.Curso().idCurso
    }
    ajaxHelper(grupoCursoUri, 'POST', grupo).done(function (data) {
      main.getAllGrupos();
    });
  }

  //CARGAR
  main.cargar = function (item) {
    main.grupoCargado(item);
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
      main.grupoNuevo.nombreGrupo(null);
      $('#modalAgregarGrupo').modal('hide');
      $('#modalAgregarCurso').modal('hide');
  }

  main.getAllGrupos();
  main.getAllCursos();
}

$(document).ready(function () {
  var modelGrupo = new ModelGrupo();
  ko.applyBindings(modelGrupo);
});
