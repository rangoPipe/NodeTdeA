const mongoose = require('../model/cursoModel');

const FindAllAsync = () => {
  return new Promise( (resolve, reject) => {
    mongoose.find({}).exec((err,listado) => {
     if(err)
       reject(err);
       resolve(listado);
   });
  });
}

const FindOneAsync = (parametros) => {
  return new Promise( (resolve, reject) => {
    mongoose.findOne(parametros).exec((err,listado) => {
     if(err)
       reject(err);
       resolve(listado);
   });
  });
}

const CreateAsync =  ( Model ) => {
  return new Promise( (resolve, reject) => {

    let curso = new mongoose(
      { codigo : Model.codCurso,
        nombre : Model.nombre,
        descripcion : Model.descripcion,
        valor: Model.valor,
        modalidad : Model.modalidad,
        intensidad : Model.intesidad,
        estado : true});

    curso.save((err,res) => {
      if(err)
        reject(err);
        resolve(res);
    });
  });
}

const UpdateAsync =  ( parametros, model ) => {
  return new Promise( (resolve, reject) => {

    return new Promise( (resolve, reject) => {
      mongoose.findOneAndUpdate(parametros, model).exec((err,listado) => {
       if(err)
         reject(err);
         resolve(listado);
     });
    });

  });
}


const DeleteAsync =  ( Model ) => {
  return new Promise( (resolve, reject) => {

    return new Promise( (resolve, reject) => {
      mongoose.findOneAndRemove(parametros).exec((err,listado) => {
       if(err)
         reject(err);
         resolve(listado);
     });
    });

  });
}

module.exports = {
  FindAllAsync,
  FindOneAsync,
  CreateAsync,
  UpdateAsync,
  DeleteAsync
}
