SELECT
    *
FROM
         usuario
    INNER JOIN hotel.tipousuario ON hotel.tipousuario.id = usuario.tipo_usuario_id
    left JOIN hotel.negocio ON hotel.negocio.usuario_id = usuario.id
WHERE
    usuario.usuario = :usuario