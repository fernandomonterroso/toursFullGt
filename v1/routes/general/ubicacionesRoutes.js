'use strict'

var express = require("express");
var ubicaciones = require("../../controllers/ubicacionesController");
var md_auth = require('../../middleware/aunthenticated');

var api = express.Router();
//RUTAS
api.get('/getUbicaciones' ,ubicaciones.listarUbicaciones);
api.get('/getComercios' ,ubicaciones.getNegociosXUbicacionCategorizados);
api.get('/listarArticulos' ,ubicaciones.listarArticulos);
api.get('/listarProductos' ,ubicaciones.listarProductos);
api.post('/login' ,ubicaciones.login);
api.post('/crearProducto' ,[md_auth.ensureAuth],ubicaciones.crearProducto);
api.post('/registrar' ,ubicaciones.registrar);
api.get('/listarTipoNegocio' ,ubicaciones.listarTipoNegocio);
api.post('/crearNegocio' ,[md_auth.ensureAuth],ubicaciones.crearNegocio);
api.get('/listarNegocios' ,[md_auth.ensureAuth],ubicaciones.listarNegocios);
api.get('/listarPedidosPorUsuario' ,[md_auth.ensureAuth],ubicaciones.listarPedidosPorUsuario);
api.post('/comprarProducto' ,[md_auth.ensureAuth],ubicaciones.comprarProducto);
api.get('/misVentas' ,[md_auth.ensureAuth],ubicaciones.misVentas);
api.get('/tweet', ubicaciones.encontrarTweet);

//EXPORTACION DE RUTAS
module.exports = api;