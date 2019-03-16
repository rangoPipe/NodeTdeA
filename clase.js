// NOTE: Clase Estudiante
const { promedio, exportar } = require('./funciones');



module.exports = {
    id : 1,
    nombre : 'Felipe',
    edad : 20,
    notas : {
      calculo : 4.0,
      lenguajes : 3.0,
      investigacion : 5.0
    },
    promedio : promedio,
    exportar : exportar
}
