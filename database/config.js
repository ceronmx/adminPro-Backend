const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conectado a la BD');
    } catch (e) {
        console.log(e);
        throw new Error('Error al conectar con la BD, para mas información revise los logs.')
    }
}

module.exports = {
    dbConnection
}