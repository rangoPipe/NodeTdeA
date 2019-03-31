
const path = require('path');
const assets = path.join( __dirname,'node_modules');
const paths = {
  public : `${__dirname}/public`,
  partials : `${__dirname}/partials`,
  css: {
    bootstrap : `${assets}/bootstrap/dist/css`
  },
  js: {
    jquery : `${assets}/jquery/dist`,
    popper : `${assets}/popper.js/dist/umd`,
    bootstrap : `${assets}/bootstrap/dist/js`,
  }

}

const main =  require('./controller/main/controller');
const usuario =  require('./controller/usuario/controller');

module.exports = {
  main,
  usuario,
  paths
}
