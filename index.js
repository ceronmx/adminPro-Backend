require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');


// Se crea servidor express
const app = express();

// Conexión a base de datos
dbConnection();

/* Inicia cors 
   (Intercambio de origen cruzado: Solicitar recursos restringidos en una página web desde un dominio diferente)
*/
app.use( cors() )

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok : true,
        msg: 'Hola mundo'
    });
});



// Se inicia servidor en el puerto indicado por la variable de entorno
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: '+ process.env.PORT);
});