const logic = require('../../logic/usuarioLogic');

const Create = async (req,res) => {
  console.log(req);
  let find = await logic.FindOneAsync({nombre:req.body.nombre});
  if(!find.data)
     await logic.CreateAsync(req.body);
  res.redirect('/')
}

const View = async(req,res) => {

  const id = (req.query.id) ? req.query.id : 0;
  let usuario = await logic.FindByIdAsync(id);
  let data = (usuario.success) ? usuario.data : {};
  res.render(`usuario/${ (id==0) ? 'create' : 'view' }`, data);
}

module.exports = {
  Create,
  View
}
