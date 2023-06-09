'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan")
const cors = require("cors")
app.set("port",3000)

//CARGAR RUTAS
var generalRoutes = require('./v1/routes/general/generalRoutes');
var ubicacionRoutes = require('./v1/routes/general/ubicacionesRoutes');

//MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(morgan('dev'))



//CABEZERAS
app.use((err,req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//RUTAS
app.use('/api/v1/general',generalRoutes);
app.use('/api/v1/general',ubicacionRoutes);
app.use('/api',ubicacionRoutes);

app.use((err, req, res, next) => {
	// Envía una respuesta de error al cliente
	res.status(500).send({error:err});
  });
//EXPORTAR
module.exports = app;