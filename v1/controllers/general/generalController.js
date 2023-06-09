'use strict'

const conexion = require('../../../conexiones/oracledbCombex');


function listarClientes(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_clientes.sql', options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {

            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function createCliente(req, res, next) {

    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_cliente_by_nit.sql', bindParams: { nit: req.body.nit }, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            if (result.rows.length > 0) {
                return res.status(500).send({ error: "El nit ya existe registrado con anterioridad." });
                //return next(err.toString());
            } else {
                conexion.queryObject({ ruta: 'v1/src/querys/ins_cliente.sql', bindParams: req.body, options: { autoCommit: true, timeout: 2000 } })
                    .then(function (result) {
                        return res.status(200).send({ data: "Creado correctamente" });
                    })
                    .catch(function (err) {
                        return next(err.toString());
                    });
            }

        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function getClienteById(req, res, next) {

    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_cliente_by_nit.sql', bindParams: req.body, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            if (result.rows.length < 1) {
                return res.status(404).send({ error: "No fue posible localizar el NIT, debe de crearlo." });
            } else {
                return res.status(200).send({ data: result.rows[0] });
            }

        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function listCotizaciones(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_cotizaciones.sql' })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function repoMensualServicio(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_repo_servicios.sql' })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function repoCompras(req, res, next) {
    conexion.queryObject({ query:"SELECT *FROM compra"})
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function getCotizacion(req, res, next) {
    console.log(req.query);
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_cotizacion_by_id.sql',bindParams:{cotizacion_id:req.query.cotizacion_id} })
        .then(function (result) {

            conexion.queryObject({ query:"SELECT * FROM CLIENTE WHERE ID_CLIENTE=:ID_CLIENTE", bindParams:{ID_CLIENTE:result.rows[0].ID_CLIENTE}})
            .then(function (result2) {
                return res.status(200).send({ data: {cliente: result2.rows[0], cotizacion:result.rows} });
            })
            .catch(function (err) {
                return next(err.toString());
            });
            //return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function getCotizacionFac(req, res, next) {
    console.log(req.query);
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_cotizacion_by_idfac.sql',bindParams:{cotizacion_id:req.query.cotizacion_id} })
        .then(function (result) {

            conexion.queryObject({ query:"SELECT * FROM CLIENTE WHERE ID_CLIENTE=:ID_CLIENTE", bindParams:{ID_CLIENTE:req.query.ID_CLIENTE}})
            .then(function (result2) {
                
                conexion.queryObject({ query:"SELECT * FROM FACTURA WHERE cotizacion_id=:cotizacion_id", bindParams:{cotizacion_id:req.query.cotizacion_id}})
                .then(function (result3) {
                    return res.status(200).send({ data: {cliente: result2.rows[0], cotizacion:result.rows,factura: result3.rows[0]} });
                })
                .catch(function (err) {
                    return next(err.toString());
                });
                    
                
            })
            .catch(function (err) {
                return next(err.toString());
            });
            //return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

async function facturar(req, res, next) {

    await conexion.queryObject({ query: 'SELECT * FROM FACTURA WHERE COTIZACION_ID=:cotizacion_id',bindParams:{cotizacion_id:req.query.cotizacion_id} })
        .then(function (result) {
            if(result.rows.length>0){
                return res.status(200).send({ data: "Factura ya existente " });
            }
            
        })
        .catch(function (err) {
            return next(err.toString());
        });

    await conexion.queryObject({ query: 'CALL P_GENERAFACTURA(:cotizacion_id)',bindParams:{cotizacion_id:req.query.cotizacion_id} })
        .then(function (result) {
            return res.status(200).send({ data: "Factura generada correctamente." });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function getTarifa(req, res, next) {

    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_precio_byparams.sql', bindParams: { ser_pre_id: req.body.SER_PRE_ID, sev_tipo_id: req.body.SEV_TIPO_ID }, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            if (result.rows.length < 1) {
                return res.status(404).send({ error: "No fue posible encontrar la tarifa." });
            } else {
                return res.status(200).send({ data: result.rows[0] });
            }

        })
        .catch(function (err) {
            return next(err.toString());
        });
}


function getSecuenciaCotizacion(req, res, next) {

    conexion.queryObject({ query: 'SELECT sec_cotizacion_id.NEXTVAL COTIZACION_ID FROM DUAL' })
        .then(function (result) {
            return res.status(200).send({ data: result.rows[0] });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}


async function createCotizacion(req, res, next) {

    let parmsCoti =
    {
        ruta: 'v1/src/querys/webpage/ins_cotizacion.sql',
        bindParams: {
            cotizacion_id: req.body.COTIZACION_ID,
            cantidad_prendas: req.body.CANTIDAD_PRENDAS,
            fecha_devolucion: req.body.fecha_devolucion,
            pedido_total: req.body.PEDIDO_TOTAL,
            id_cliente: req.body.info_cliente.ID_CLIENTE,
        }
    };

    conexion.queryObject(parmsCoti)
        .then(function (result) {

        })
        .catch(function (err) {
            console.log("1", err);
            return next(err.toString());
        });

    for (let index = 0; index < req.body.det_coti.length; index++) {

        let parmsCotiDet =
        {
            ruta: 'v1/src/querys/webpage/ins_cotizacion_det.sql',
            bindParams: {
                ser_pre_id: req.body.det_coti[index].SER_PRE_ID,
                sev_tipo_id: req.body.det_coti[index].SEV_TIPO_ID,
                det_cantidad: req.body.det_coti[index].DET_CANTIDAD,
                del_pre_tot: req.body.det_coti[index].DEL_PRE_TOT,
                del_pre_uni: req.body.det_coti[index].DEL_PRE_UNI,
                cotizacion_id: req.body.COTIZACION_ID,
                prenda_descripcion: req.body.det_coti[index].SER_PRE_DESC,

            }
        };
        let set = await conexion.queryObject(parmsCotiDet)
            .then(function (result) {

            })
            .catch(function (err) {
                console.log("2", err);
                return next(err);
            });
    }

    return res.status(200).send({ data: "Creado correctamente" });
}


module.exports = {
    listarClientes,
    createCliente,
    getClienteById,
    getTarifa,
    getSecuenciaCotizacion,
    createCotizacion,
    listCotizaciones,
    getCotizacion,
    getCotizacionFac,
    facturar,
    repoMensualServicio,
    repoCompras,
}