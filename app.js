const express = require('express');
const opn = require('opn');
const argv = require('./modules/comands/yargs').yargs;
const crud = require('./modules/estudiante/crud');

const app = express();
app.use( express.static(__dirname + '/public'));

switch (argv._[0]) {
  case 'create':
    crud.Crear(argv);
  break;

  case 'list':
    crud.Mostrar();
  break;

  case 'find':
    let result = crud.Buscar(argv.nombre);
    MostrarEstudiante(result);
  break;

  case 'prom':
    if(argv.nombre){
      let promedio = crud.PromedioEst(argv.nombre);
      console.log(`El promedio del estudiante ${argv.nombre} es ${promedio}`);
    }

    if(argv.all)
      crud.PromedioAll();

  break;



  default:
    console.error('No se ingreso ningun codigo valido');
}

//app.listen(8080);
//opn('http://localhost:8080');
