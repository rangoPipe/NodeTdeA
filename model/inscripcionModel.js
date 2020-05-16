
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const inscripcionModel = new Schema({
  idCurso : {
    type : ObjectId,
    required : true
  },
  idPersona : {
    type : ObjectId,
    required : true
  },
  estado : {
    type : Boolean,
    default: true
  },
});

module.exports = mongoose.model('Inscripcion', inscripcionModel);
