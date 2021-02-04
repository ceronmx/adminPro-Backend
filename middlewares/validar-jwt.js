const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    //leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            msg: 'Petición no verificada'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
}


module.exports = {
    validarJWT
}