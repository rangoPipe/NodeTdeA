
const path = require('path');
const assets = path.join( __dirname,'node_modules');
const paths = {
  public : `${__dirname}/public`,
  partials : `${__dirname}/partials`,
  bd : `${__dirname}/BD`,
  css: {
    bootstrap : `${assets}/bootstrap/dist/css`,
    fontawesome : `${assets}/@fortawesome/fontawesome-free/css/`
  },
  js: {
    jquery : `${assets}/jquery/dist`,
    popper : `${assets}/popper.js/dist/umd`,
    bootstrap : `${assets}/bootstrap/dist/js`,
    fontawesome : `${assets}/@fortawesome/fontawesome-free/js`
  }
}

const main =  require('./controller/main/controller');
const usuario =  require('./controller/usuario/controller');
const curso =  require('./controller/curso/controller');
const inscripcion =  require('./controller/inscripcion/controller');

module.exports = {
  main,
  usuario,
  inscripcion,
  curso,
  paths
}
