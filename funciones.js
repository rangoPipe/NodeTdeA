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
    else console.log("\nSe genero el certificado correctamente");
  });
}

function imprimirCurso(curso){
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[codigo: ${curso.codigo}]
      [nombre]: ${curso.nombre}
      [profesor]: ${curso.profesor}
      [horario]: ${curso.horario} (${curso.dias})
      [duraciòn]: ${curso.duracion} horas
      [costo]: ${curso.costo}
      `);
      resolve();
    }, 2000);
  });
}

function buscarCurso( cursos, codigo ){
  return new Promise(resolve => {
      let curso = cursos.find(x => x.codigo == codigo);
      resolve(curso);
  });
}

async function msgInicial( cursos ){
    console.log("A continuación se visualizarán los cursos prestados. \n");
    for(var curso in cursos)
         await imprimirCurso(cursos[curso]);
}


module.exports = {
  promedio,
  exportar,
  imprimirCurso,
  msgInicial,
  buscarCurso
}
