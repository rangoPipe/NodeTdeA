const fs = require('fs')

listaEstudiantes = [];

const Crear = (estudiante) => {
  Listar();
  if(listaEstudiantes.filter(est => est.nombre == estudiante.nombre).length > 0)
    return console.log(`El estudiante con nombre ${estudiante.nombre} ya existe`);

  let datos = {
    nombre : estudiante.nombre,
    matematicas : estudiante.matematicas,
    ingles : estudiante.ingles,
    programacion : estudiante.programacion
  }
  listaEstudiantes.push(datos);
  Guardar();
}

const Guardar = () => {
  fs.writeFile("listaEstudiantes.json", JSON.stringify(listaEstudiantes), (err) => {
    if(err) throw (err);
    console.log ('guardo correctamente');
  });
}

const Listar = () => {
  try {
    listaEstudiantes = require('../../listaEstudiantes.json');
  } catch (e) {
    listaEstudiantes = [];
  }
}

const Mostrar = () => {
  Listar();
  console.log('Listado de estudiantes:');
  listaEstudiantes.forEach(estudiante =>  MostrarEstudiante(estudiante));
}

const MostrarEstudiante = (estudiante) => {
  console.log('\nEstudiante:');
    Object.keys(estudiante).forEach( i => {
      console.log(i,estudiante[i]);
    })
}

const Buscar = (nombre) => {
  Listar();
  const result = listaEstudiantes.filter(item => item.nombre == nombre);
    if(result.length === 0) return console.log(`El estudiante ${nombre} no se encuentra registrado`);
  console.log('Listado del estudiante:');
  return result;
}

const Promedio = (estudiante) => {
  const suma =
              ((parseFloat(estudiante.matematicas)) ? estudiante.matematicas : 0) +
              ((parseFloat(estudiante.ingles)) ? estudiante.ingles : 0) +
              ((parseFloat(estudiante.programacion)) ? estudiante.programacion : 0);
  return (suma / 3).toFixed(2);
}

const PromedioEst = (nombre) => {
  let estudiante = Buscar(nombre);
  let promedio = Promedio(estudiante[0]);
  return promedio;
}

const PromedioAll = () => {
  Listar();
  const buenosEstudiantes = listaEstudiantes.filter(item => Promedio(item) > 3);
  if(buenosEstudiantes.length > 0)  buenosEstudiantes.forEach( item => console.log(`El promedio del estudiante ${item.nombre} es ${PromedioEst(item.nombre)}`));
  else console.log('Ningun estudiante supera el promedio de 3.0');
}

module.exports = {
  Crear,
  Mostrar,
  Buscar,
  MostrarEstudiante,
  PromedioEst,
  PromedioAll
}
