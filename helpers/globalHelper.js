var fs = require('fs');


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

module.exports = {
    readCommand
}