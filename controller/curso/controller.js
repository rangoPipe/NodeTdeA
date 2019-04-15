const fs = require('fs');
const uuid = require('uuid/v4');
const bdPath = `../../BD/curso.json`;
const modalidadesPath = '../../BD/modalidades.json';
const funciones = require('../../funciones');
const mongoose = require('../../model/curso');

listaCurso = [];

const Crear = (curso) => {
  /*Listar();
  /if(listaCurso.filter(x => x.nombre == curso.nombre).length > 0)
    return false;

  let id = uuid();
  let datos = {
    idCurso : id,
    codigo : curso.codCurso,
    nombre : curso.nombre,
    descripcion : curso.descripcion,
    valor : curso.valor,
    modalidad : curso.modalidad, // 1 = virtual , 0=presencial
    intensidad : curso.intensidad,
    estado : true
  }

  listaCurso.push(datos);
    return (Guardar()) ? id : false;*/

    const curso = new mongoose({
      codigo : curso.codigo,
      nombre : curso.nombre,
      descripcion : curso.descripcion,
      valor: curso.valor,
      modalidad : curso.modalidad,
      intensidad : curso.intesidad,
      estado : true
    });

    curso.save((err,res)=>{
      if(err){
        console.log(err);
      }
      else console.log(res);
    });
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
  const result = listaCurso.find(x => x.idCurso == id);
  return (!result) ? false : result;
}

const Deshabilitar = (id) => {
  Listar();
  listaCurso.forEach(x => {
    if( x.idCurso == id) x.estado = false;
  })
}


// NOTE: Acciones

const Create = (req,res) => res.render('curso/create',{
  modalidades : funciones.convertSelect(require(modalidadesPath),'idModalidad','valor')
});

const CreatePost = (req,res) => {
  if( Crear(req.body) );
    res.redirect('./verCursos');
}

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
      idCurso : curso.idCurso,
      codigo : curso.codigo,
      nombre : curso.nombre,
      descripcion : curso.descripcion,
      valor : curso.valor,
      modalidad : curso.modalidad,
      intensidad : curso.intensidad,
      estado : curso.estado,
      modalidades : funciones.convertSelect(require(modalidadesPath),'idModalidad','valor')
    });
    else
      res.redirect('./error');
}

const RemovePost = (req,res) => {
  Deshabilitar(req.body.id);
  res.redirect('./verCursos')
}

module.exports = {
  Index,
  Create,
  CreatePost,
  View,
  Buscar,
  RemovePost
}
