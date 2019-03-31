const fs = require('fs');
const uuid = require('uuid/v4');
const pathJson = 'usuario.json';

listaUsuario = [];

const Crear = (usuario) => {
  Listar();
  if(listaUsuario.filter(x => x.nombre == usuario.nombre).length > 0)
    return false;

  let datos = {
    id : uuid(),
    numDoc : usuario.numDoc,
    nombre : usuario.nombre,
    correo : usuario.correo,
    telefono : usuario.telefono,
    id_rol : usuario.id_rol
  }

  listaUsuario.push(datos);
  Guardar();
}

const Guardar = () => {
  fs.writeFile(pathJson, JSON.stringify(listaUsuario), (err) => {
    if(err) throw (err);
    return true;
  });
}

const Listar = () => {
  try {
    listaUsuario = require(pathJson);
  } catch (e) {
    listaUsuario = [];
  }
}

const Mostrar = () => {
  Listar();
  listaUsuario.forEach(x =>  MostrarUsuario(x));
}

const MostrarUsuario = ( usuario ) => {
    Object.keys(usuario).forEach( i => {
      console.log(i,usuario[i]);
    })
}

const Buscar = (nombre) => {
  Listar();
  const result = listaUsuario.filter(x => x.nombre == nombre);
    if(result.length === 0) return false;
  return result;
}


const Create = (req,res) => {
  res.render('usuario/create',{
  })
}

module.exports = {
  Create,
  Crear,
  Mostrar,
  Buscar,
  MostrarUsuario
}
