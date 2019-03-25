const express = require('express');
const opn = require('opn');
const argv = require('./modules/comands/yargs').yargs;
const crud = require('./modules/estudiante/crud');
const hbs = require('hbs')
const bodyParser = require('body-parser')
require('./helpers/helperHbs')


const app = express();
hbs.registerPartials(__dirname + '/partials');

app.set('view engine','hbs')
app.use( express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : false}))

app.get('/',(req,res) => {
  res.render('index',{
    estudiante : req.query.nombre,
    nota1 : req.body.nota1,
    nota2 : req.body.nota2,
    nota3 : req.body.nota3
  })
});

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

app.listen(8080);
opn('http://localhost:8080');
