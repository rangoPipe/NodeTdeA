const nombre = { alias : 'n', demand : true };
const matematicas = { alias : 'm', demand : true};
const ingles = { alias: 'i', demand : true };
const programacion = { alias : 'p', demand : true};

const opcionesCrear = { nombre, matematicas, ingles, programacion };


const yargs = require('yargs')
.command('create','Se crea el registro de estudiante con sus materias', opcionesCrear)
.command('list','Se mostraran los estudiantes matriculados, con sus notas')
.command('find','Se mostraran los datos del estudiante matriculados, con sus notas', { nombre })
.command('prom','Se mostrara el promedio del estudiante dado', { nombre : { alias : 'n'}, all: { alias:'a' } })
.argv;

module.exports = {
  yargs
}
