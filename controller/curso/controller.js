const funciones = require('../../funciones');
const logic = require('../../logic/cursoLogic')
const modalidadLogic = require('../../logic/modalidadLogic');
const rolLogic = require('../../logic/rolLogic');

// NOTE: Acciones

const Create = async (req,res) => {
  let find = await logic.FindOneAsync({codigo:req.body.codCurso});
  if(!find.data)
     await logic.CreateAsync(req.body);
  res.redirect('./verCursos')
}

const Index = async (req,res) => {
   let datos = await logic.FindAllAsync({});
   let rol = await rolLogic.FindByIdAsync(req.session.id_rol);
     console.log('rol',req.session.session);
    res.render('curso/index', {
      cursos : (datos.success) ? datos.data.filter(x => x.estado == true) : null
    });
}

const View = async(req,res) => {

  const id = (req.query.id) ? req.query.id : 0;
  let curso = await logic.FindByIdAsync(id);
  let data = (curso.success) ? curso.data : {};
  let modalidades = await modalidadLogic.FindAllAsync({});
  data.modalidades = funciones.convertSelect(
                        (modalidades.success) ? modalidades.data.filter(x => x.estado == true) : []
                     ,'_id','valor');

  res.render(`curso/${ (id==0) ? 'create' : 'view' }`, data);
}

const Delete = async (req,res) => {
  let result = await logic.UpdateAsync({ _id : req.body.id },{ estado : false })
  res.redirect('./verCursos')
}

module.exports = {
  Index,
  Create,
  View,
  Delete
}
