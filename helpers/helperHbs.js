const hbs = require('hbs')

hbs.registerHelper('ObtenerPromedio',(nota1, nota2, nota3)=>{
  return (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
})
