require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');


// Se crea servidor express
const app = express();

/* Inicia cors 
   (Intercambio de origen cruzado: Solicitar recursos restringidos en una página web desde un dominio diferente)
*/
app.use( cors() );
// Conexión a base de datos
dbConnection();

// Directorio público
app.use(express.static('public'));

// Parse y lectura del body
app.use( express.json() );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/busquedas.route'));
app.use('/api/upload', require('./routes/uploads.route'));




// Se inicia servidor en el puerto indicado por la variable de entorno
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: '+ process.env.PORT);
});