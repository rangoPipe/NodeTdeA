
require('./helpers/helperHbs');

const opn = require('opn');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const req = require('./imports');
const mongoose = require('mongoose');
const session = require('express-session');

app.set('view engine','hbs');
app.set('trust proxy', 1) // trust first proxy
hbs.registerPartials( req.paths.partials );

app.use( express.static( req.paths.public ) );
app.use( bodyParser.urlencoded({extended : false}) );

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req,res,next) => {
  res.locals.session = (req.session.session) ? (req.session.session) : null;
  res.locals.nickname = (req.session.nick) ? (req.session.nick) : null;
  res.locals.idUsuario = (req.session.idUsuario) ? (req.session.idUsuario) : null;
   next()
})


app.use( '/css', express.static( req.paths.css.bootstrap ) );
app.use( '/css', express.static( req.paths.css.fontawesome ) );

app.use( '/js', express.static( req.paths.js.jquery ) );
app.use( '/js', express.static( req.paths.js.popper ) );
app.use( '/js', express.static( req.paths.js.bootstrap ) );
app.use( '/js', express.static( req.paths.js.fontawesome ) );
app.use( '/js', express.static( req.paths.js.public ) );


app.get( '/',req.main.index );
app.get( '/remover',req.main.remover );

app.get( '/crearUsuario',req.usuario.View );
app.post( '/crearUsuario',req.usuario.Create);

app.get( '/verCursos',req.curso.Index );
app.get( '/verCurso',req.curso.View );
app.get( '/crearCurso',req.curso.View );
app.post( '/crearCurso',req.curso.Create);
app.post( '/removerCurso',req.curso.Delete);

app.get('/inscribirCurso',req.inscripcion.ViewEstudiante)
app.get('/verInscritos',req.inscripcion.View)
app.post('/crearInscripcion',req.inscripcion.Create)
app.post('/removerInscripcion',req.inscripcion.Delete)


app.post('/api/Loggear',req.usuario.Loggear)

app.get('*',(req,res) => res.render('main/error'));

const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/dbNodeTdeA', {useNewUrlParser: true},(err,res)=>{
  if(err)
    return console.log("no se pudo conectar");
    console.log("conexion exitosa");
});
app.listen(port, () => {
  console.log(`Servidor en el puerto ${port}`);
});
//opn('http://localhost:8080', {app: ['google chrome', '--incognito']});
