const Usuario = require('../models/usuario.model');
const fs = require('fs');

const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model'); 


const borrarImagen = ( path ) => {
    if (fs.existsSync(path)){
        //Eliminar imagen anterior
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async(tipo, id, fileName) => {

    let pathViejo = '';

    switch(tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('Usuario no registrado');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = fileName;
            await usuario.save();
        break;
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Médico no registrado');
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = fileName;
            await medico.save();

        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital no registrado');
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = fileName;
            await hospital.save();
        break;
    }
}


module.exports = {
    actualizarImagen
}