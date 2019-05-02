socket = io()

socket.on("mensaje",(info) => {
  console.log(info)
});

  socket.emit("contador")


  socket.on("contador",(info) => {
    console.log(info)
  });


document.querySelector('#formulario').addEventListener('submit',(e)=>{
  e.preventDefault();
  const texto = e.target.elements.texto.value;
  const nombre = e.target.elements.nombre.value;
  socket.emit("mensaje",{texto : texto , nombre: nombre});
})

document.querySelector
