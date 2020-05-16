const logic = require('../../logic/inscripcionLogic');
const cursoLogic = require('../../logic/cursoLogic');
const estudianteLogic = require('../../logic/estudianteLogic');


// NOTE: Acciones

const ViewEstudiante = async (req,res) => {
  const curso =  await cursoLogic.FindByIdAsync(req.query.id);
  if(curso.success){
    res.render('inscripcion/create',{
    idCurso : req.query.id,
    nomCurso : curso.data.nombre
    })
  }
  else res.redirect('/error');
};

const Create= async (req,res) => {

  let estudiante = await estudianteLogic.FindOneAsync({numDoc:req.body.numDoc});
  if(!estudiante.data)
     estudiante = await estudianteLogic.CreateAsync(req.body);

  let inscripcion = {
    idCurso : req.body.idCurso,
    idPersona : estudiante.data._id
  };

  let proceso = await logic.FindOneAsync({ idCurso : inscripcion.idCurso , idPersona : inscripcion.idPersona})

  if (proceso.success && proceso.data)
    res.render('inscripcion/create',{
      alerta: "danger",
      msg : "El usuario ya esta registrado",
      idCurso : req.body.idCurso,
      nomCurso : req.body.nomCurso
    });

  else if (proceso.success && !proceso.data){
    await logic.CreateAsync(inscripcion);
    res.render('inscripcion/create',{
      alerta: "success",
      msg : "El usuario se registro correctamente",
      idCurso : req.body.idCurso,
      nomCurso : req.body.nomCurso
    });
  }
  else
    res.redirect('/error');

}

const View = async (req,res) => {
  const id = req.query.id;

  const ListEstudiantes = [];
  let ListCursos  = await logic.FindAllAsync( {idCurso:id} );
  ListCursos = (ListCursos.success) ? ListCursos.data : [];

  if(ListCursos)
    ListCursos.filter(x => x.estado == true).forEach( async(x) => {
      let data = (await estudianteLogic.FindByIdAsync(x.idPersona));
      ListEstudiantes.push((data.success) ? data.data : [] );
    });

  res.render('inscripcion/index',{
    idCurso : id,
    listaEstudiantes : ListEstudiantes
  })
}

const Delete = async (req,res) => {
  let result = await logic.UpdateAsync({ _id : req.body.id },{ estado : false })
  res.redirect(`verInscritos?id=${req.body.idCurso}`)
}


module.exports = {
  ViewEstudiante,
  Create,
  Delete,
  View
}
