const hbs = require('hbs')

hbs.registerHelper('ObtenerPromedio',(nota1, nota2, nota3)=>{
  return (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
})


hbs.registerHelper('ListarCursos', (json) => {
  let tabla = `
    <table class="table table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre del Curso</th>
        <th scope="col">Código</th>
        <th scope="col">Valor</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Opciones</th>
      </tr>
    </thead>
    <tbody>`;
    json.forEach(( x,i ) => {
      tabla+= `
      <tr>
      <th scope="row">${i+1}</th>
      <td>${x.nombre}</td>
      <td>${x.codigo}</td>
      <td>${x.valor}</td>
      <td>${x.descripcion}</td>
      <td><a class="btn btn-outline-primary" href="/verCurso?id=${x.id}" title="Ver"><i class="fas fa-search"></i></a></td>
      </tr>`;
    });

    tabla+=`
      </tbody>
    </table>`;

  return tabla;
});


hbs.registerHelper('disponibilidad', (valor) => {
  return (valor) ? '<span class="badge badge-success">Disponible</span>' : '<span class="badge badge-danger">Cerrado</span>';
})

hbs.registerHelper('selectOption', (json, current = 0) => {
  let option = ``;
  json.forEach(x =>
     option += `<option value="${x.value}" ${( x.value == current )? "selected" : "" }> ${x.display}</option>`
  );
  return option;
});
