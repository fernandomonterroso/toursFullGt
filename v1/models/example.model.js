//import { Model } from "objectmodel";

var { Model } = require("objectmodel");

Model.prototype.errorCollector = function(errors){
	//console.log(errors);
    let errores=[];
	errors.forEach(error =>{
        errores.push({
            "path": error.path,
            "message": error.path+" is required"
        }) 
    });
    throw errores;
};


var SchemaExample = Model({
    tarea: String,
    descripcion: String,
    image: String,
}).defaultTo({
	descripcion: "",
	image: ""
});

module.exports = SchemaExample;