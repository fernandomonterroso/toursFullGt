INSERT INTO NEGOCIO (NOMBRE, TIPO_NEGOCIO_ID, USUARIO_ID, DESCRIPCION, NUMERO, EMAIL) 
                   VALUES (:nombre, :tipo_negocio_id, :usuario_id, :descripcion, :numero, :email) RETURNING ID INTO :id