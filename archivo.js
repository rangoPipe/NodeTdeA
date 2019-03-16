const opciones = {
  opcion1 : {
    default : 0,
    alias : 'o1'
  },
  opcion2 :{
    default : 0,
    alias : 'o2'
  },
  opcion3 :{
    alias : 'o3',
    demand : true
  }
}



const argv = require('yargs')
             .command('nomCommando','descripcion del comando',opciones)
             .argv

console.log(argv);
