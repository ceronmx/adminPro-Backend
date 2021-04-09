const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario.model");

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

const validarADMIN_ROLE = async (req, res= response, next) => {
    const uid = req.uid;
    try {
        const user = await Usuario.findById(uid);
        
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if(user.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Petición no autorizada'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }   
}

const validarADMIN_sameUser = async (req, res= response, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const user = await Usuario.findById(uid);
        
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        if(user.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Petición no autorizada'
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }   
}


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_sameUser
}