const fs = require('fs');
const uuid = require('uuid/v4');
const bdPath = `../../BD/estudiante.json`;

listaEstudiantes = [];

const Crear = (estudiante) => {
  Listar();
  let lista = listaEstudiantes.find(x => x.numDoc == estudiante.numDoc)
  if(lista)
    return lista.idEstudiante;

  let datos = {
    idEstudiante : uuid(),
    numDoc : estudiante.numDoc,
    nombre : estudiante.nombre,
    correo : estudiante.correo,
    telefono : estudiante.telefono,
    estado : true
  }
  listaEstudiantes.push(datos);
    return Guardar()
}

const Guardar = () => {
  fs.writeFile('BD/estudiante.json', JSON.stringify(listaEstudiantes), (err) => {
    if(err) throw (err);
    return true;
  });
}

const Listar = () => {
  try {
    listaEstudiantes = require(bdPath);
  } catch (e) {
    listaEstudiantes = [];
  }
}

const Buscar = (id) => {
  Listar();
  const result = listaEstudiantes.find(x => x.idEstudiante == id);
    if(!result) return false;
  return result;
}

const BuscarByDoc = (dc) => {
  Listar();
  const result = listaEstudiantes.find(x => x.numDoc == dc);
    if(!result) return false;
  return result;
}


// NOTE: Acciones


module.exports = {
  Crear,
  BuscarByDoc,
  Buscar
}
