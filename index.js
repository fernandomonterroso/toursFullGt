const app = require("./app");

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log(`El servidor esta corriendo en http://localhost:${app.get('port')}`);
});