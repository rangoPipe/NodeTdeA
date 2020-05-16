
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const cursoModel = new Schema({
  codigo : {
    type : String,
    required : true
  },
  nombre : {
    type : String,
    required : true,
    trim : true
  },
  descripcion : {
    type : String
  },
  valor : {
    type : Number,
    default: 0,
    min : [1,'Ingrese un valor mayor a 0']
  },
  modalidad : {
    type : ObjectId
  },
  intesidad : {
    type : String
  },
  estado : {
    type : Boolean,
    default: true
  }
});

//mongoose-unique-validator
module.exports =  mongoose.model('curso', cursoModel);
