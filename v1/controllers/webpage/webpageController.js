'use strict'

const conexion = require('../../../conexiones/oracledbCombex');


function getMenuUser(req, res, next) {
    conexion.queryObject({ruta:'v1/src/querys/webpage/sel_menu.sql'})
    .then(function (result) {

        
        return res.status(200).send({data:result.rows});
    })
    .catch(function (err) {
        return next(err);
    });
}

module.exports = {
    getMenuUser,
}


