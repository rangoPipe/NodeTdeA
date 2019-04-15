
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cursoSchema = new Schema({
  codigo : {
    type : String,
    required : true
  },
  nombre : {
    type : String,
    required : true
  },
  descripcion : {
    type : String
  },
  valor : {
    type : Number
  },
  modalidad : {
    type : String
  },
  intesidad : {
    type : String
  },
  estado : {
    type : Boolean
  }
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;
