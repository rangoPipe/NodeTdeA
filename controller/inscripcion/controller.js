const fs = require('fs');
const uuid = require('uuid/v4');
const bdPath = `../../BD/inscripcion.json`;
const funciones = require('../../funciones');
const cursos = require('../curso/controller');
const estudiantes = require('../estudiante/controller');

listaIncripcion = [];

const Crear = async (inscripcion) => {
  Listar();
  var dato = listaIncripcion.find(x => x.idPersona == inscripcion.idPersona && x.idCurso == inscripcion.idCurso );
  if(dato)
    return await false;

  let datos = {
    idInscripcion : uuid(),
    idCurso : inscripcion.idCurso,
    idPersona : inscripcion.idPersona,
    estado : true
  }
  listaIncripcion.push(datos);
    return await Guardar();
}

const Guardar = () => {
  return new Promise(resolve => {
      fs.writeFile('BD/inscripcion.json', JSON.stringify(listaIncripcion), (err) => {
        if(err) throw(err);
        resolve(true);
      });
  });
}

const Listar = () => {
  try {
    listaIncripcion = require(bdPath);
  } catch (e) {
    listaIncripcion = [];
  }
}

const Buscar = (id) => {
  Listar();
  const result = listaIncripcion.find(x => x.idInscripcion == id);
    if(result.length === 0) return false;
  return result;
}

const BuscarByCurso = (id) => {
  Listar();
  const result = listaIncripcion.filter(x => x.idCurso == id);
    if(result.length === 0) return false;
  return result;
}

const Deshabilitar = (id) => {
  Listar();
  listaIncripcion.forEach(x => {
    if( x.idPersona == id) x.estado = false;
  })
}


// NOTE: Acciones

const Create = (req,res) => {
  const curso = cursos.Buscar(req.query.id);
  if(curso){
    res.render('inscripcion/create',{
    idCurso : req.query.id,
    nomCurso : curso.nombre
    })
  }
  else res.redirect('/error');
};

const CreatePost = async (req,res) => {
  let estudiante = estudiantes.Crear(req.body);
  let inscripcion
  if(!estudiante)
      inscripcion = {
        idCurso : req.body.idCurso,
        idPersona : (estudiantes.BuscarByDoc(req.body.numDoc)).idEstudiante
      };
  else
    inscripcion = {
      idCurso : req.body.idCurso,
      idPersona : estudiante
    };

    if( await Crear(inscripcion) )
    res.render('inscripcion/create',{
      alerta: "success",
      msg : "El usuario se registro correctamente",
      idCurso : req.body.idCurso,
      nomCurso : req.body.nomCurso
    })
    else
      res.render('inscripcion/create',{
        alerta: "danger",
        msg : "El usuario ya esta registrado",
        idCurso : req.body.idCurso,
        nomCurso : req.body.nomCurso
      })

}

const View = (req,res) => {
  const id = req.query.id;
  const ListCursos  = BuscarByCurso(id);
  const ListEstudiantes = [];

  if(ListCursos)
    ListCursos.filter(x => x.estado == true).forEach(x => {
      ListEstudiantes.push( estudiantes.Buscar(x.idPersona) );
    });

  res.render('inscripcion/index',{
    idCurso : id,
    listaEstudiantes : ListEstudiantes
  })
}

const RemovePost = (req,res) => {
  Deshabilitar(req.body.id);
  res.redirect(`verInscritos?id=${req.body.idCurso}`);
}

module.exports = {
  Create,
  CreatePost,
  RemovePost,
  View
}
