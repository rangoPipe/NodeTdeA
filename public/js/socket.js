socket = io()

const formulario = document.querySelector('#formulario');
const chat = document.querySelector('#chat');
const mensaje = formulario.querySelector('#texto')

  socket.emit("contador")


  socket.on("contador",(info) => {
    console.log(`Usuarios conectados ${info}`)
  });

  socket.on("mensaje",(info) => {
    if(info.texto)chat.innerHTML =`${chat.innerHTML} </br> ${info.nombre}: ${info.texto}`;
  });

formulario.addEventListener('submit',(e) => {
  e.preventDefault();
  const texto = e.target.elements.texto.value;
  const nombre = e.target.elements.nombre.value;
  socket.emit("mensaje",
    { texto : texto , nombre: nombre }, () => {

      mensaje.value = ""
      mensaje.focus()
    });
})
