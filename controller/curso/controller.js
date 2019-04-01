const fs = require('fs');
const uuid = require('uuid/v4');
const bdPath = `../../BD/curso.json`;
const modalidadesPath = '../../BD/modalidades.json';
const funciones = require('../../funciones');

listaCurso = [];

const Crear = (curso) => {
  Listar();
  if(listaCurso.filter(x => x.nombre == curso.nombre).length > 0)
    return false;

  let datos = {
    id : uuid(),
    codigo : curso.codCurso,
    nombre : curso.nombre,
    descripcion : curso.descripcion,
    valor : curso.valor,
    modalidad : curso.modalidad, // 1 = virtual , 0=presencial
    intensidad : curso.intensidad,
    estado : true
  }

  listaCurso.push(datos);
    return Guardar();
}

const Guardar = () => {
  fs.writeFile('BD/curso.json', JSON.stringify(listaCurso), (err) => {
    if(err) throw (err);
    return true;
  });
}

const Listar = () => {
  try {
    listaCurso = require(bdPath);
  } catch (e) {
    listaCurso = [];
  }
}

const Buscar = (id) => {
  Listar();
  const result = listaCurso.find(x => x.id == id);
    if(result.length === 0) return false;
  return result;
}


// NOTE: Acciones

const Create = (req,res) => res.render('curso/create',{
  modalidades : funciones.convertSelect(require(modalidadesPath),'idModalidad','valor')
});
const Index = (req,res) => {
  Listar();
  res.render('curso/index', {
  cursos : listaCurso.filter(x => x.estado == true)
  });
}

const View = (req,res) => {
  const id = req.query.id;
  Listar();
  let curso = Buscar(id);
  if(curso)
    res.render('curso/view', {
      id : curso.id,
      codigo : curso.codigo,
      nombre : curso.nombre,
      descripcion : curso.descripcion,
      valor : curso.valor,
      modalidad : curso.modalidad, // 1 = virtual , 0=presencial
      intensidad : curso.intensidad,
      estado : curso.estado,
      modalidades : funciones.convertSelect(require(modalidadesPath),'idModalidad','valor')
    });
    else
      res.redirect('./error');
}


const CreatePost = (req,res) => {
  if( Crear(req.body) );
    res.redirect('./verCursos');
}

module.exports = {
  Index,
  Create,
  CreatePost,
  View
}
