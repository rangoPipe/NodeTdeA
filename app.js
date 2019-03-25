const express = require('express');
const opn = require('opn');

const app = express();

app.use( express.static(__dirname + '/public'));

app.listen(8080);
opn('http://localhost:8080');
