
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const usuarioModel = new Schema({
  numDoc : {
    type : Number,
    required : true
  },
  nombre : {
    type : String,
    required : true,
    trim : true
  },
  correo : {
    type : String
  },
  telefono : {
    type : String
  },
  nickname : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  id_rol : {
    type : ObjectId
  },
  estado : {
    type : Boolean,
    default: true
  }
});
//mongoose-unique-validator
module.exports =  mongoose.model('usuario', usuarioModel);
