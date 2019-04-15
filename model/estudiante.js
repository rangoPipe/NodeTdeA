
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const estudianteSchema = new Schema({
  numDoc : {
    type : Number,
    required : true
  },
  nombre : {
    type : String,
    required : true
  },
  correo : {
    type : String
  },
  telefono : {
    type : String
  },
  estado : {
    type : Boolean
  },
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
module.exports = Estudiante;
