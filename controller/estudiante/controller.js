const logic = require('../../logic/estudianteLogic')

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


// NOTE: Acciones


module.exports = {

}
