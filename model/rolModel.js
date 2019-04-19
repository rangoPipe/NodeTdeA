
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolModel = new Schema({
  valor : {
    type : String,
    required : true,
    trim : true
  },
  descripcion : {
    type : String,
    trim : true
  },
  estado : {
    type : Boolean,
    default: true
  }
});

//mongoose-unique-validator

module.exports = mongoose.model('rol', rolModel);
