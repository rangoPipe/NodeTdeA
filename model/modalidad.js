
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModalidadModel = new Schema({
  valor : {
    type : String,
    required : true,
    trim : true
  },
  descripcion : {
    type : String,
    trim : true
  }
});

//mongoose-unique-validator

module.exports = mongoose.model('Modalidad', ModalidadModel);
