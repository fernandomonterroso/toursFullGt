SELECT
    negocioubicacion.id,
    ubicacion.pais,
    ubicacion.ciudad,
    ubicacion.imagen,
    negocioubicacion.negocio_id,
    negocioubicacion.ubicacion_id,
    ubicacion.id              AS id1,
    tiponegocio.id            AS id2,
    tiponegocio.descripcion,
    hotel.negocio.nombre,
    hotel.negocio.descripcion AS descripcion1,
    negocioubicacion.foto,
    negocioubicacion.estrellas
FROM
         ubicacion
    INNER JOIN negocioubicacion ON negocioubicacion.ubicacion_id = ubicacion.id
    INNER JOIN hotel.negocio ON negocioubicacion.negocio_id = hotel.negocio.id
    INNER JOIN tiponegocio ON tiponegocio.id = hotel.negocio.tipo_negocio_id
    where negocioubicacion.UBICACION_ID=:id_ubi
    and tiponegocio.id=:id