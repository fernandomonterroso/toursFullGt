'use strict'
var jwt = require('../services/jwt')

const conexion = require('../../conexiones/oracledbCombex');


function listarUbicaciones(req, res, next) {

    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_ubicaciones.sql', options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            console.log(err.toString());
            return next(err.toString());
        });
}

async function listarPedidosPorUsuario(req, res, next) {
    try {
      const usuarioId = req.user.sub;
  
      // Realizar la consulta para obtener los detalles de factura y el encabezado de factura
      const query = `
      SELECT
      *
  FROM
           factura
      INNER JOIN detallefactura ON detallefactura.factura_id = factura.id
      INNER JOIN hotel.producto ON detallefactura.producto_id = hotel.producto.id
        WHERE factura.usuario_id = :usuarioId
      `;
      const result = await conexion.queryObject({ query, bindParams: { usuarioId } });
      const filas = result.rows;
  
      // Estructurar los resultados en un formato de respuesta que incluya el encabezado y los detalles de factura
      const pedidos = {};
      filas.forEach(fila => {
        const { ID, USUARIO_ID, FECHA, TOTAL, ID_UBICACION, ...detalle } = fila;
        if (!pedidos[ID]) {
          pedidos[ID] = {
            ID,
            USUARIO_ID,
            FECHA,
            TOTAL,
            ID_UBICACION,
            detalles: []
          };
        }
        pedidos[ID].detalles.push(detalle);
      });
  
      // Convertir el objeto de pedidos en un array
      const resultado = Object.values(pedidos);
  
      // Retornar la lista de pedidos como respuesta
      return res.status(200).json({data:resultado});
    } catch (error) {
      console.log(error.toString());
      return next(error.toString());
    }
  }
  

  async function misVentas(req, res, next) {
    try {
      const usuarioId = req.user.sub;
  
      const query = `
        SELECT
          negocio.id AS NEGOCIO_ID,
          negocio.nombre AS NEGOCIO_NOMBRE,
          factura.id AS FACTURA_ID,
          factura.fecha,
          factura.total,
          detallefactura.id AS detalle_factura_id,
          detallefactura.producto_id,
          detallefactura.cantidad,
          detallefactura.precio_unitario,
          producto.nombre AS producto_nombre,
          producto.descripcion AS producto_descripcion
        FROM
          usuario
          INNER JOIN negocio ON negocio.usuario_id = usuario.id
          INNER JOIN hotel.negocioubicacion ON hotel.negocioubicacion.negocio_id = negocio.id
          INNER JOIN factura ON factura.id_ubicacion = hotel.negocioubicacion.ubicacion_id
          INNER JOIN detallefactura ON detallefactura.factura_id = factura.id
          INNER JOIN producto ON detallefactura.producto_id = producto.id
        WHERE
          usuario.id = :usuarioid
      `;
  
      const result = await conexion.queryObject({ query, bindParams: { usuarioid: usuarioId } });
      const filas = result.rows;
  
      const pedidos = {};
      filas.forEach(fila => {
        const {
            NEGOCIO_ID,
            NEGOCIO_NOMBRE,
            FACTURA_ID,
            FECHA,
            TOTAL,
            DETALLE_FACTURA_ID,
            PRODUCTO_ID,
            CANTIDAD,
            PRECIO_UNITARIO,
            PRODUCTO_NOMBRE,
            PRODUCTO_DESCRIPCION
        } = fila;
        if (!pedidos[NEGOCIO_ID]) {
          pedidos[NEGOCIO_ID] = {
            negocio_id: NEGOCIO_ID,
            negocio_nombre: NEGOCIO_NOMBRE,
            facturas: []
          };
        }
  
        const factura = pedidos[NEGOCIO_ID].facturas.find(f => f.id === FACTURA_ID);
        console.log(PRODUCTO_NOMBRE);
        if (factura) {
          factura.detalles.push({
            DETALLE_FACTURA_ID,
            PRODUCTO_ID,
            CANTIDAD,
            PRECIO_UNITARIO,
            PRODUCTO_NOMBRE,
            PRODUCTO_DESCRIPCION
          });
        } else {
          const nuevaFactura = {
            id: FACTURA_ID,
            FECHA,
            TOTAL,
            detalles: [
              {
                DETALLE_FACTURA_ID,
                PRODUCTO_ID,
                CANTIDAD,
                PRECIO_UNITARIO,
                PRODUCTO_NOMBRE,
                PRODUCTO_DESCRIPCION
              }
            ]
          };
  
          pedidos[NEGOCIO_ID].facturas.push(nuevaFactura);
        }
      });
  
      const resultado = Object.values(pedidos);
  
      return res.status(200).json({ data: resultado });
    } catch (error) {
      console.log(error.toString());
      return next(error.toString());
    }
  }

async function comprarProducto(req, res, next) {
    try {
        const jsonData = req.body;
        // Obtener los datos del producto y la cantidad de la solicitud
        const { usuario, productos, total } = jsonData;


        // Realizar las validaciones necesarias (por ejemplo, verificar si hay suficiente stock)

        // Realizar la lógica de compra y generar la factura
        const factura = await generarFactura(usuario, productos, total);
        // Retornar la respuesta exitosa con la factura generada
        return res.status(200).send({ message: 'Compra realizada exitosamente', factura });
    } catch (error) {
        console.log(error.toString());
        return next(error.toString());
    }
}

async function factura(usuario_id, facturaId) {
    const query = `
        SELECT *
        FROM factura
        INNER JOIN detallefactura ON detallefactura.factura_id = factura.id
        INNER JOIN hotel.producto ON hotel.producto.id = detallefactura.producto_id
        WHERE factura.usuario_id = :usuario_id AND factura.id = :facturaId
    `;
    try {
        const result = await conexion.queryObject({
            query: query,
            bindParams: { usuario_id: usuario_id, facturaId: facturaId },
            options: { autoCommit: true, timeout: 2000 }
        });
        return result.rows;
    } catch (error) {
        console.log(error.toString());
        throw error.toString();
    }
}

async function generarFactura(usuario, productos, total) {
    // Realizar la lógica para generar la factura y almacenarla en la base de datos

    // Por ejemplo, podrías insertar un registro en la tabla FACTURA y DETALLEFACTURA
    const facturaId = await insertarFactura(usuario, productos, total);
    await insertarDetalleFactura(facturaId, usuario, productos, total);
    return await factura(usuario.sub,facturaId);
}

async function insertarFactura(usuario, productos, total) {
    // Realizar la lógica para insertar un registro en la tabla FACTURA y obtener el ID generado
    const { sub, nombre, apellido, nick, email, image, tipo, NEGOCIO, tipo_usuario_id } = usuario;
    //const { UBICACION_ID} = productos;
    // Por ejemplo, podrías ejecutar una consulta SQL de inserción y obtener el ID generado
    const query = `
      INSERT INTO FACTURA (USUARIO_ID, FECHA, TOTAL,ID_UBICACION)
      VALUES (:usuarioId, SYSDATE, :total,:UBICACION_ID)
      RETURNING ID INTO :facturaId
    `;
    console.log(productos[0]);
    const bindParams = {
        usuarioId: sub, // Ajusta el valor correspondiente del usuario
        total: total, // Calcula el total de la compra
        UBICACION_ID:productos[0].UBICACION_ID,
        facturaId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const result = await conexion.queryObject({
        query: query,
        bindParams: bindParams,
        options: { autoCommit: true, timeout: 2000 }
    });

    const facturaId = result.outBinds.facturaId[0];
    return facturaId;
}

async function insertarDetalleFactura(facturaId, usuario, productos, total) {

    productos.forEach(async producto => {
        const { ID, NOMBRE, DESCRIPCION, NEGOCIO_ID, FOTO, PRECIO, STOCK, VISIBLE, cantidad } = producto;
        const query = `
                INSERT INTO DETALLEFACTURA (FACTURA_ID, PRODUCTO_ID, CANTIDAD, PRECIO_UNITARIO)
                VALUES (:facturaId, :productoId, :cantidad, :precio)
                `;

        const bindParams = {
            facturaId: facturaId,
            productoId: ID,
            cantidad: cantidad,
            precio: cantidad*PRECIO
        };

        await conexion.queryObject({
            query: query,
            bindParams: bindParams,
            options: { autoCommit: true, timeout: 2000 }
        });
    });


}

function listarTipoNegocio(req, res, next) {
    try {
        // Realiza la consulta SQL para obtener los tipos de negocio
        const query = 'SELECT * FROM TIPONEGOCIO';

        // Ejecuta la consulta utilizando tu función personalizada
        conexion.queryObject({ query: query, options: { autoCommit: true, timeout: 2000 } })
            .then(function (result) {
                return res.status(200).send({ data: result.rows });
            })
            .catch(function (err) {
                return next(err.toString());
            });
    } catch (error) {
        return next(error.toString());
    }
}

function listarNegocios(req, res, next) {
    try {
        conexion.queryObject({ ruta: 'v1/src/querys/general/sel_negocio_propios.sql', bindParams: { usuario_id: req.user.sub }, options: { autoCommit: true, timeout: 2000 } })
            .then(function (result) {
                return res.status(200).send({ data: result.rows });
            })
            .catch(function (err) {
                console.log(err.toString());
                return next(err.toString());
            });
    } catch (error) {
        console.log(error.toString());
        return next(error.toString());
    }
}



const oracledb = require('oracledb');

async function crearNegocio(req, res, next) {
    try {
        console.log(req.user);
        const { NOMBRE, TIPO_NEGOCIO_ID, DESCRIPCION, NUMERO, EMAIL } = req.body;
        const bindParams = {
            nombre: NOMBRE,
            tipo_negocio_id: TIPO_NEGOCIO_ID,
            usuario_id: req.user.sub,
            descripcion: DESCRIPCION,
            numero: NUMERO,
            email: EMAIL,
            id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        };

        // Ejecuta la consulta utilizando tu función personalizada
        const result = await conexion.queryObject({ ruta: 'v1/src/querys/general/insert_negocio.sql', bindParams: bindParams, options: { autoCommit: true, timeout: 2000 } });

        const idInsertado = result.outBinds.id[0];

        for (let index = 0; index < req.body.detalle.length; index++) {
            //const element = array[index];
            const { UBICACION_ID, FOTO, ESTRELLAS } = req.body.detalle[index];
            const bindParams2 = {
                negocio_id: idInsertado,
                ubicacion_id: UBICACION_ID,
                foto: FOTO
            };
            console.log(bindParams2);
            await conexion.queryObject({ ruta: 'v1/src/querys/general/ins_detalleubicacion.sql', bindParams: bindParams2, options: { autoCommit: true, timeout: 2000 } });
        }


        // Devuelve una respuesta exitosa
        return res.status(200).send({ message: 'Negocio creado exitosamente' });
    } catch (error) {
        console.log(error.toString());
        return next(error.toString());
    }
}

function listarProductos(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_productos.sql', bindParams: { negocio_id: req.query.negocio_id }, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function crearProducto(req, res, next) {
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        negocio_id: req.query.negocio_id,
        foto: req.body.foto,
        precio: req.body.precio,
        stock: req.body.stock
    };

    conexion.queryObject({ ruta: 'v1/src/querys/general/ins_producto.sql', bindParams: producto, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            return res.status(201).send({ message: 'Producto creado exitosamente' });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

async function login(req, res) {
    var params = req.body;
    var emailOrNick = params.emailOrNick;
    var password = params.password;

    conexion.queryObject({
        ruta: `v1/src/querys/general/sel_login.sql`, bindParams: { usuario: emailOrNick }, options: { autoCommit: true, timeout: 2000 }
    })
        .then(function (result) {
            console.log(result.rows.length);
            if (!result.rows.length == 1) {
                return res.status(404).send({ message: 'El usuario no ha podido loguearse' });
            } else if (result.rows[0].CONTRASENA != password) {
                return res.status(401).send({ message: 'Contraseña incorrecta' });
            } else {
                const user = result.rows[0];
                console.log(user);
                const formattedUser = {
                    sub: user.ID,
                    nombre: user.NOMBRE,
                    apellido: '', // Agrega el valor correspondiente del apellido
                    nick: user.USUARIO,
                    email: '', // Agrega el valor correspondiente del email
                    image: '',
                    tipo: user.DESCRIPCION,
                    NEGOCIO: user.ID_2 || "ERROR",
                    tipo_usuario_id: user.TIPO_USUARIO_ID,
                };

                return res.status(200).send({ token: jwt.createToken(formattedUser), user: formattedUser });
            }

        })
        .catch(function (err) {
            console.log(err);
            return next(err.toString());
        });
}

async function registrar(req, res, next) {
    var params = req.body;

    try {

        if (!(params.nombre && params.nick && params.email && params.password)) {
            return res.status(200).send({
                error: 'Rellene los datos necesarios'
            });
        };
        const { nombre, tipo_usuario_id, nick, password, apellido } = req.body;

        const bindParams = {
            nombre: nombre,
            tipo_usuario_id: tipo_usuario_id,
            usuario: usuario,
            contrasena: password,
            apellido: apellido
        };

        // Ejecuta la consulta utilizando tu función personalizada
        await conexion.queryObject({ ruta: 'v1/src/querys/general/ins_usuario.sql', bindParams: bindParams, options: { autoCommit: true, timeout: 2000 } });
        return res.status(200).send({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.log(error.toString());
        next(error.toString());
    }


}

function listarArticulos(req, res, next) {

    conexion.queryObject({
        query: `SELECT
    *
 FROM
     articulo where ID_UBICACION=${req.query.id}`, options: { autoCommit: true, timeout: 2000 }
    })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function getNegociosXUbicacionCategorizados(req, res, next) {
    var id_ubi = req.query.id;
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_tipos_negocios.sql', options: { autoCommit: true, timeout: 2000 } })
        .then(async function (result) {
            const promises = result.rows.map(row => negocios(row.ID, id_ubi));
            const negociosDetArray = await Promise.all(promises);
            result.rows.forEach((row, index) => {
                row.negociosDet = negociosDetArray[index];
            });
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err.toString());
        });
}

function negocios(id, id_ubi) {
    let bindParams = { id_ubi: id_ubi, id: id };
    return conexion.queryObject({ ruta: 'v1/src/querys/general/sel_negocio_params.sql', bindParams: bindParams, options: { autoCommit: true, timeout: 2000 } })
        .then(function (result) {
            return result.rows;
        })
        .catch(function (err) {
            return err.toString();
        });
}

const axios = require('axios');
async function encontrarTweet(req, res) {

    const url = 'https://www.reddit.com/user/Ready_Comment/submitted/.json?limit=1&order=1';

    let hola = await axios.get(url)
     .then(response => {
    const children = response.data.data.children.map(item => ({
        data: {
            title: item.data.title
        }
    }));

    const responseData = {
        data: {
            children
        }
    };

    res.status(200).json(responseData);
})
     .catch (error => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
});


    // res.status(200).send({
    //   "data": {
    //     "children": [
    //       {
    //         "data": {
    //           "title": "adios"
    //         }
    //       },
    //       {
    //         "data": {
    //           "title": "hola"
    //         }
    //       },
    //       {
    //         "data": {
    //           "title": "triste"
    //         }
    //       }
    //     ]
    //   }
    // });
    
  }

module.exports = {
    listarUbicaciones,
    getNegociosXUbicacionCategorizados,
    listarArticulos,
    login,
    listarProductos,
    crearProducto,
    registrar,
    listarTipoNegocio,
    crearNegocio,
    listarNegocios,
    comprarProducto,
    listarPedidosPorUsuario,
    misVentas,
    encontrarTweet,
}