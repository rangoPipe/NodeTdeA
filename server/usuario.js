class Usuario {

  constructor() {
    this.usuarios = [];
  }

  agregarUsuario(id,nombre){
    this.usuarios.push({id,nombre});
    return this.usuarios;
  }


  getUsuarios(){
    return this.usuarios;
  }

  getUsuario(id){
    return this.usuarios.filter(x => x.id == id)[0];
  }

  borrarUsuario(id){
    let usuario = this.getUsuario(id);
    this.usuarios = this.usuarios.filter(x => x.id != id);
    return usuario;
  }


}

module.exports = {
  Usuario
}
