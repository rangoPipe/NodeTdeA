const mongoose = require('../model/usuarioModel');
const bcrypt = require('bcrypt');

const FindAllAsync = (parametros) => {
  return new Promise( (resolve, reject) => {
    mongoose.find(parametros).exec((err,res) => {
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
    Model.nickname = Model.nick;
    Model.password = bcrypt.hashSync(Model.pass, 10);
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

const LoginAsync = ( usuario , contra ) => {
  return new Promise( (resolve) => {
    mongoose.findOne({ nickname:usuario }).exec((err,res) => {
      if(err)
        resolve({ success:false, data:err });
      if(res){
         if(bcrypt.compareSync(contra,res.password))
           resolve({ success:true, data:res })

      }
      resolve({ success:false, data:[] });

   });
  });
}

module.exports = {
  FindAllAsync,
  FindOneAsync,
  FindByIdAsync,
  CreateAsync,
  UpdateAsync,
  DeleteAsync,
  LoginAsync
}
