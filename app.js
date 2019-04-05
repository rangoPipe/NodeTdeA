
require('./helpers/helperHbs');

const opn = require('opn');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const req = require('./imports');

hbs.registerPartials( req.paths.partials );

app.set('view engine','hbs')
app.use( express.static( req.paths.public ) );
app.use( bodyParser.urlencoded({extended : false}) );

app.use( '/css', express.static( req.paths.css.bootstrap ) );
app.use( '/css', express.static( req.paths.css.fontawesome ) );

app.use( '/js', express.static( req.paths.js.jquery ) );
app.use( '/js', express.static( req.paths.js.popper ) );
app.use( '/js', express.static( req.paths.js.bootstrap ) );
app.use( '/js', express.static( req.paths.js.fontawesome ) );


app.get( '/',req.main.index );
app.get( '/remover',req.main.remover );

app.get( '/crearUsuario',req.usuario.Create );

app.get( '/verCursos',req.curso.Index );
app.get( '/verCurso',req.curso.View );
app.get( '/crearCurso',req.curso.Create );
app.post( '/crearCurso',req.curso.CreatePost);
app.post( '/removerCurso',req.curso.RemovePost);

app.get('/inscribirCurso',req.inscripcion.Create)
app.get('/verInscritos',req.inscripcion.View)
app.post('/crearInscripcion',req.inscripcion.CreatePost)
app.post('/removerInscripcion',req.inscripcion.RemovePost)

app.get('*',(req,res) => res.render('main/error'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});
//opn('http://localhost:8080', {app: ['google chrome', '--incognito']});
