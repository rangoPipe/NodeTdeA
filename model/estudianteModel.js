
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteModel = new Schema({
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
    type : Boolean,
    default: true
  },
});

module.exports = mongoose.model('estudiante', estudianteModel);
