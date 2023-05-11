var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user_routes = require('./routes/user.routes');

//permite que cualquier dominio pueda hacer peticiones a la api
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cargar archivos de rutas
app.use('/api',user_routes)
//exportar
module.exports = app;