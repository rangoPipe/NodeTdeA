console.clear();

const estudiante = require('./clase');

estudiante.exportar(`La calificación del estudiante : ${ estudiante.nombre }
es ${estudiante.promedio(estudiante.notas)}`);
