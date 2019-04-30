require('./config/config')
const socket = require('socket.io');
const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


const dirPublic = path.join(__dirname,"../public");
app.use(express.static(dirPublic));

io.on('connection', client => {
  console.log('alguien se conecto');

  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });

});

server.listen(process.env.PORT,(err) => {
  console.log(`Conexion exitosa por el puerto: ${process.env.PORT}`);
});
