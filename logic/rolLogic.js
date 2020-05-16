const mongoose = require('../model/rolModel');

const FindAllAsync = (filtro) => {
  return new Promise( (resolve, reject) => {
    mongoose.find(filtro).exec((err,res) => {
      (err)
        ? resolve({ success:false, data:err })
        : resolve({ success:true, data:res });
   });
  });
}

const FindOneAsync = (parametros) => {
  return new Promise( (resolve) => {
    mongoose.findOne(parametros).exec((err,res) => {
      (err)
        ? resolve({ success:false, data:err })
        : resolve({ success:true, data:res });
   });
  });
}

const FindByIdAsync = (id) => {
  return new Promise( (resolve, reject) => {
    mongoose.findById(id).exec((err,res) => {
      (err)
        ? resolve({ success:false, data:err })
        : resolve({ success:true, data:res });
   });
  });
}

const CreateAsync =  ( Model ) => {
  return new Promise( (resolve, reject) => {

    let curso = new mongoose( Model );

    curso.save((err,res) => {
      (err)
        ? resolve({ success:false, data:err })
        : resolve({ success:false, data:res });
    });
  });
}

const UpdateAsync =  ( parametros, model ) => {

    return new Promise( (resolve, reject) => {
      mongoose.findOneAndUpdate(parametros, model).exec((err,res) => {
        (err)
          ? resolve({ success:false, data:err })
          : resolve({ success:true, data:res });
     });
    });
}

const DeleteAsync =  ( Model ) => {

    return new Promise( (resolve, reject) => {
      mongoose.findOneAndRemove(parametros).exec((err,res) => {
        (err)
          ? resolve({ success:false, data:err })
          : resolve({ success:true, data:res });
     });
    });
}

module.exports = {
  FindAllAsync,
  FindOneAsync,
  FindByIdAsync,
  CreateAsync,
  UpdateAsync,
  DeleteAsync
}
