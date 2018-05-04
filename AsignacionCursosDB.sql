DROP DATABASE IF EXISTS AsignacionCursos;
CREATE DATABASE AsignacionCursos;
USE AsignacionCursos;

CREATE TABLE Curso(
	idCurso INT NOT NULL AUTO_INCREMENT,
    nombreCurso VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCurso)
);

CREATE TABLE Grupo(
	idGrupo INT NOT NULL AUTO_INCREMENT,
    nombreGrupo VARCHAR(50) NOT NULL,
    PRIMARY KEY (idGrupo)
);

CREATE TABLE CursoGrupo(
	idCursoGrupo INT NOT NULL AUTO_INCREMENT,
    idGrupo INT NOT NULL,
    idCurso INT NOT NULL,
    PRIMARY KEY (idCursoGrupo),
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo)ON DELETE CASCADE,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)ON DELETE CASCADE
);
-- PROCEDIMIENTOS ALMACENADOS
-- AGREGAR GRUPO
DROP procedure IF EXISTS `insertarGrupo`;
DELIMITER $$
CREATE PROCEDURE insertarGrupo (IN _nombreGrupo VARCHAR(50))
BEGIN
	IF NOT EXISTS (SELECT * FROM Grupo WHERE nombreGrupo = _nombreGrupo) THEN
		INSERT INTO grupo(nombreGrupo) VALUES (_nombreGrupo);
	END IF;
END$$
DELIMITER ;

-- AGREGAR CURSO
DROP procedure IF EXISTS `insertarCurso`;
DELIMITER $$
CREATE PROCEDURE insertarCurso (IN _nombreCurso VARCHAR(50))
BEGIN
	IF NOT EXISTS (SELECT * FROM Curso WHERE nombreCurso = _nombreCurso) THEN
		INSERT INTO Curso(nombreCurso) VALUES (_nombreCurso);
	END IF;
END$$
DELIMITER ;

-- AGREGAR CURSOGRUPO
DROP procedure IF EXISTS insertarCursoGrupo;
DELIMITER $$
CREATE PROCEDURE insertarCursoGrupo (IN _idGrupo INT, IN _idCurso INT)
BEGIN
	IF NOT EXISTS (SELECT * FROM CursoGrupo WHERE idGrupo = _idGrupo AND idCurso = _idCurso) THEN
		INSERT INTO CursoGrupo(idGrupo, idCurso) VALUES(_idGrupo, _idCurso);
	END IF;
END$$
DELIMITER ;

-- VISTAS
-- VISTA CURSOS GRUPOS
DROP VIEW IF EXISTS vista_CursoGrupo;
CREATE VIEW vista_CursoGrupo AS
	SELECT cg.idCursoGrupo, g.nombreGrupo, c.nombreCurso
	FROM CursoGrupo cg
	INNER JOIN Grupo g ON cg.idGrupo = g.idGrupo
	INNER JOIN Curso c ON cg.idCurso = c.idCurso;

-- VISTA CURSOS DEL GRUPOS
DROP VIEW IF EXISTS vista_CursosG;
CREATE VIEW vista_CursosG AS
	SELECT cg.idCursoGrupo, cg.idGrupo, c.nombreCurso
	FROM CursoGrupo cg
	INNER JOIN Curso c ON cg.idCurso = c.idCurso;

-- VISTA GRUPOS DEL CURSO
DROP VIEW IF EXISTS vista_GruposC;
CREATE VIEW vista_GruposC AS
	SELECT cg.idCursoGrupo, cg.idCurso, g.nombreGrupo
	FROM CursoGrupo cg
	INNER JOIN Grupo g ON cg.idGrupo = g.idGrupo;
