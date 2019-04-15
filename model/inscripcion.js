
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscripcionModel = new Schema({
  numDoc : {
    type : Number,
    required : true
  },
  idCurso : {
    type : ObjectId,
    required : true
  },
  idPersona : {
    type : ObjectId,
    required : true
  },
  estado : {
    type : Boolean
  },
});

module.exports = mongoose.model('Inscripcion', inscripcionModel);
