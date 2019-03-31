
require('./helpers/helperHbs');

const opn = require('opn');
const uuid = require('uuid/v4');
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
app.use( '/js', express.static( req.paths.js.jquery ) );
app.use( '/js', express.static( req.paths.js.popper ) );
app.use( '/js', express.static( req.paths.js.bootstrap ) );


app.get( '/',req.main.index );
app.get( '/crearUsuario',req.usuario.Create );

app.get('*',(req,res) => {
  res.render('main/error')
});

console.log( uuid() );


app.listen(8080);
opn('http://localhost:8080', {app: ['google chrome', '--incognito']});
