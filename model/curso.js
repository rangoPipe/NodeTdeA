
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
    required : true,
    trim : true
  },
  descripcion : {
    type : String
  },
  valor : {
    type : Number,
    default: 0
    min : [0,'Ingrese un valor mayor a 0']
  },
  modalidad : {
    type : String,
    enum : { values: ["Presencial","Virtual"] }
  },
  intesidad : {
    type : String
  },
  estado : {
    type : Boolean
  }
});

//mongoose-unique-validator

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;
