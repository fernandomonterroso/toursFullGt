'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'monterroso';

exports.createToken = function(user){
    var payload = {
        sub: user.sub,
        nombre: user.nombre,
        apellido: user.apellido,
        nick: user.nick,
        email: user.email,
        image: user.image,
        tipo:user.tipo,
        tipo_usuario_id:user.tipo_usuario_id,
        id_usuario:user.id_usuario,
        NEGOCIO_ID: user.NEGOCIO_ID,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}