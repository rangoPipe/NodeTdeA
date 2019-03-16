const fs = require('fs');


const promedio = (notas) => {
  let valor = 0;
  for (var nota in notas)
     valor += notas[nota];
  return ( valor / Object.keys(notas).length );
}


const exportar = (texto) => {
  fs.writeFile("Archivo.txt",texto,(err)=>{
    if(err) throw err;
    else console.log("se genero correctamente");
  });
}

module.exports = {
  promedio,
  exportar
}
