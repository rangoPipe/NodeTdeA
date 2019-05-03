require('./config/config')
const socket = require('socket.io');
const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


const dirPublic = path.join(__dirname,"../public");
app.use(express.static(dirPublic));

let contador = 0;
const { Usuario } = require('./usuario');
const usuarios = new Usuario();

io.on('connection', client => {

    client.emit("mensaje","bienvenido");

    client.on("contador", () => {
      contador++;
      console.log(`Cantidad de usuarios ${contador}`);
      io.emit("contador",contador)
    });

    client.on("mensaje", (mensaje, callback) => {
      let usuario = usuarios.getUsuario(client.id)
      io.emit("mensaje",{mensaje,usuario})
      callback()
    });

  //client.on('event', data => { /* … */ });
  client.on('disconnect', () => {
    contador--;
    if(contador<0) contado=0
    let usuario = usuarios.borrarUsuario(client.id)
    io.emit('desconectarUsuario',usuario.nombre)

  });

  client.on('usuarioNuevo', (nick) => {
    usuarios.agregarUsuario(client.id,nick)
    io.emit('nuevoUsuario',nick)
  });

});

server.listen(process.env.PORT,(err) => {
  console.log(`Conexion exitosa por el puerto: ${process.env.PORT}`);
});
