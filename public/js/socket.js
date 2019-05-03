socket = io()

const formulario = document.querySelector('#formulario');
const chat = document.querySelector('#chat');
const mensaje = formulario.querySelector('#texto')

var param = new URLSearchParams(window.location.search );
var usuario = param.get('nombre')

  socket.emit("contador")
  socket.on("connect",() => {
    console.log(usuario)
    socket.emit('usuarioNuevo',usuario)
  });

  socket.on("nuevoUsuario",(info) => {
    console.log(`Se conecto ${info}`)
    chat.innerHTML =`${chat.innerHTML} </br> Se conecto: <strong>${info}</strong> </br>`;
  });

  socket.on("desconectarUsuario",(info) => {
    console.log(`Se desconecto ${info}`)
    chat.innerHTML =`${chat.innerHTML} </br> Se desconecto: <strong>${info}</strong> </br>`;
  });

  socket.on("contador",(info) => {
    console.log(`Usuarios conectados ${info}`)
  });

  socket.on("mensaje",(info) => {
    if(info.mensaje)chat.innerHTML =`${chat.innerHTML} </br> ${info.usuario.nombre}: ${info.mensaje}`;
  });


formulario.addEventListener('submit',(e) => {
  e.preventDefault();
  socket.emit("mensaje", mensaje.value, () => {
      mensaje.value = ""
      mensaje.focus()
    });
})
