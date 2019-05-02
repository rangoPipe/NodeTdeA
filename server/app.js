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

io.on('connection', client => {

    client.emit("mensaje","bienvenido");

    client.on("contador", () => {
      contador++;
      console.log(`Cantidad de usuarios ${contador}`);
      io.emit("contador",contador)
    });

    client.on("mensaje", (mensaje) => {
      io.emit("mensaje",mensaje)
    });

  //client.on('event', data => { /* … */ });
  client.on('disconnect', () => {
    contador--;
    console.log(`Cantidad de usuarios ${contador}`);
  });

});

server.listen(process.env.PORT,(err) => {
  console.log(`Conexion exitosa por el puerto: ${process.env.PORT}`);
});
