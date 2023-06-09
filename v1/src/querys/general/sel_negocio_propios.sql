SELECT
    *
FROM
         negocio
    INNER JOIN negocioubicacion ON negocio.id = negocioubicacion.negocio_id
    INNER JOIN hotel.ubicacion ON hotel.ubicacion.id = negocioubicacion.ubicacion_id
    INNER JOIN hotel.usuario ON hotel.usuario.id = negocio.usuario_id
    where negocio.usuario_id=:usuario_id