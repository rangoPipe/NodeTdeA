console.clear();
const cursos = require('./curso');
const funcion = require('./funciones');
var error = false;

const opciones = {
  codigo : {
    alias : 'c',
    demand : true
  },
  documento :{
    alias : 'd',
    demand : true
  },
  estudiante :{
    alias : 'e',
    demand : true
  }
}


// NOTE: Inicializacion del comando
const argv = require('yargs')
              .fail(async function (msg, err, yargs) {
                if (err) throw err // preserve stack
                console.error(`\nRecuerde que los campos \n\n-c[codigo del curso], \n-d [documento del estudiante], \n-e[nombre del estudiante]\n\nson obligatorios para la inscripcion
                \nPara mayor informacion ejecute el comando ingreso --help \n`);
                error = true;
                await funcion.msgInicial(cursos)
                process.exit(1)
              })
             .command('inscribir','Comando diseañado con la finalidad de visualizar e inscribir cursos por el estudiante \n',opciones)
             .argv

async function ProcesoInscripcion(){
  let { documento, codigo, estudiante } = argv;
  let curso = await funcion.buscarCurso(cursos,codigo);

  if(!curso){
    if(codigo) console.log(`\nEl curso con código ${codigo} NO existe \n`);
    await funcion.msgInicial(cursos);
    process.exit(1)
  }

  funcion.exportar(`El estudiante ${estudiante} con número de documento ${documento}
    se registra al curso [${codigo}] ${curso.nombre} de una duración de ${curso.duracion} horas
    con el profesor ${curso.profesor} en el horario ${curso.horario} [${curso.dias}]
    con un costo de $${curso.costo} pesos.`);

}

if (!error) ProcesoInscripcion()
