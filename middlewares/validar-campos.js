const { response } = require('express')
const { validationResult } = require('express-validator')


const validarCampos = ( req, res = response, next) => {
    const errors = validationResult( req );
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            error: errors.mapped()
        });
    }

    next();
}

const validarUid = (req, res = response, next) => {
    const uid = req.params.id;

    if(uid.length !== 24 ){
        return res.status(400).json({
            ok: false,
            msg: 'UID inválido, debe ser un string de 24 caracteres'
        });
    }

    next();
}

module.exports = {
    validarCampos,
    validarUid
}