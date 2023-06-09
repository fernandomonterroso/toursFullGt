'use strict'

var express = require("express");
var generalController = require("../../controllers/general/generalController");

var api = express.Router();
//RUTAS
api.get('/listarClientes' ,generalController.listarClientes);
api.post('/getClienteById' ,generalController.getClienteById);
api.post('/createCliente' ,generalController.createCliente);
api.post('/getTarifa' ,generalController.getTarifa);
api.get('/getSecuenciaCotizacion' ,generalController.getSecuenciaCotizacion);
api.post('/createCotizacion' ,generalController.createCotizacion);
api.get('/listCotizaciones' ,generalController.listCotizaciones);
api.get('/getCotizacion' ,generalController.getCotizacion);
api.get('/getCotizacionFac' ,generalController.getCotizacionFac);
api.get('/facturar' ,generalController.facturar);
api.get('/repoMensualServicio' ,generalController.repoMensualServicio);
api.get('/repoCompras' ,generalController.repoCompras);

//EXPORTACION DE RUTAS
module.exports = api;