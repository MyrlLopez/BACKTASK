const express = require("express");
const app = express();
var cors = require('cors');
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST","PUT","DELETE"],
        credentials: true,
    })
);
 
//Analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
//Archivo de rutas definidas
app.use(require('./routes/user')); 
/*  app.use(require('./routes/labels')); */
app.use(require('./routes/tasks'));  
app.use(require('./routes/categories'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor ejecutandose en el puerto 3300");
});
 
module.exports = app;