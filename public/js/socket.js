socket = io()

socket.on("mensaje",(info) => {
  console.log(info)
});

  socket.emit("mensaje","oe")

  socket.emit("contador")


  socket.on("contador",(info) => {
    if(info>2)alert('estan mas de dos usuarios conectados')
    console.log(info)
  });
