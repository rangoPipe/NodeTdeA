const hbs = require('hbs')

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
      <td>
        <a class="btn btn-outline-primary" href="/verCurso?id=${x._id}" title="Ver"><i class="fas fa-search"></i></a>
        <a class="btn btn-outline-primary" href="/inscribirCurso?id=${x._id}" title="Incripcion del curso"><i class="fas fa-key"></i></a>
          <a class="btn btn-outline-primary" href="/verInscritos?id=${x._id}" title="Incritos"><i class="fas fa-child"></i></a>
          <a class="btn btn-outline-danger" href="/remover?id=${x._id}&tipo=Curso" title="Cerrar curso"><i class="fas fa-door-closed"></i></a>
        </td>
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

hbs.registerHelper('showMessage',(msg,tipo) => {
  let title = (tipo=='danger')? 'Ocurrio un error' : 'Proceso exitoso';
  const message = `
    <div class="alert alert-${tipo}" role="alert">
      <h4 class="alert-heading">${title}!</h4>
      <p>${msg}.</p>
    </div>`;
  return (tipo) ? message : "";
})

hbs.registerHelper('ListarEstudiantes', (json = [], idCurso) => {
  let tabla = `
    <table class="table table-hover">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre del Estudiante</th>
        <th scope="col">Número del documento</th>
        <th scope="col">Télefono</th>
        <th scope="col">Correo</th>
        <th scope="col">Opciones</th>
      </tr>
    </thead>
    <tbody>`;
    json.forEach(( x,i ) => {
      tabla+= `
      <tr>
      <th scope="row">${i+1}</th>
      <td>${x.nombre}</td>
      <td>${x.numDoc}</td>
      <td>${x.telefono}</td>
      <td>${x.correo}</td>
      <td>
        <a class="btn btn-outline-danger" href="/remover?id=${x.idEstudiante}&idCurso=${idCurso}&tipo=Inscripcion" title="Remover Estudiante"><i class="fas fa-trash-alt"></i></a>
      </td>
      </tr>`;
    });

    tabla+=`
      </tbody>
    </table>`;

  return tabla;
});
