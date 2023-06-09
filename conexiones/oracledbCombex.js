const oracledb = require('oracledb');
var fs = require('fs');

async function getConexion(pool) {
    return await pool.getConnection();
}

async function getPool() {
    return await oracledb.createPool({
        user: "hotel",
        password: "guatemala",
        //connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = DESKTRON)(PORT = 1521))(CONNECT_DATA =(SID= ORCLFERNANDO)))",
        connectString: "LOCALHOST:1521/orclfer",
        poolMax: 10,
        poolMin: 0,
        poolIncrement: 1,
        poolTimeout: 10,
    })
    
}

const oracleDbClose = async function (conn,pool) {
    await conn.close();
    await pool.close();
    /*
    await conn.realese(function (err) {
        if (err)
            console.log(err.message);
        console.log("desconecto");
    });
    */
};

function timeoutPromise(time) {
    //options.isAutoCommit = false; // we only do SELECTs

    return new Promise(function (resolve, reject) {

        setTimeout(() => {
            reject({message:'Query timeout'});
        }, time);

    });
}

function queryArray(sql, bindParams, options) {
    //options.isAutoCommit = false; // we only do SELECTs

    return new Promise(async function (resolve, reject) {

        let pool = await getPool();

        getConexion(pool).then(function (connection) {
            //connection.execute(sql, bindParams, options)
            Promise.race([connection.execute(sql, bindParams, options), timeoutPromise(options.timeout)])
            .then(function (results) {
                    process.nextTick(function () {
                        oracleDbClose(connection,pool);
                    });
                    resolve(results);
                }).catch(function (err) {
                    if (err.message === "Query timeout") {
                        process.nextTick(function () {
                            oracleDbClose(connection,pool);
                        });
                        reject("Operación cancelada debido a tiempo de espera.");
                    } else {
                        process.nextTick(function () {
                            oracleDbClose(connection,pool);
                        });
                        reject(err.toString());
                    }
                });

        }).catch(function (err) {
            reject(err);
        });

    });
}

function readCommand(ruta) {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, (error, data) => {
            if (data) {
                resolve(data.toString());
            }
            else if (error) {
                reject(error);
            }
        });
    })
};


async function queryObject({ ruta,query, bindParams = {}, options = {} }) {
    const defaultOptionsBd = {
        outFormat: oracledb.OBJECT,
        autoCommit: true,
        timeout: 20000,
    };

    const mergedOptions = { ...defaultOptionsBd, ...options };
    var sql = ruta ? await readCommand(ruta):query;
    console.log(mergedOptions);

    return queryArray(sql, bindParams, mergedOptions);
}

module.exports = {
    queryObject
}

