/*
    ruta: /api/usuarios
*/


const Usuario = require("../models/usuario.model");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const {generaJWT} = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email role google");
    res.json({
      ok: true,
      usuarios,
      uid: req.uid
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, revisar logs",
    });
  }
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese email",
      });
    }

    console.log(req.body);
    //se crea usuario con el modelo Usuario
    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt); 

    //se guarda el usuario en la bd
    await usuario.save();
    const token = await generaJWT(usuario.uid);

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, revisar logs",
    });
  }
};

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const user = await Usuario.findById(uid);
        
        if (!user){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }


        //campos a actualizar
        const {password, google, email, ...campos} = req.body;
        if (campos.email !== email ){
            const emailExist = await Usuario.findOne({email})
            if(emailExist){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const userActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: userActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:"Error, revisar logs"
        })
    }
}

const borrarUsuario = async(req, res = response) => {
  const uid = req.params.id;

  try {

    const user = Usuario.findById(uid);

    if(!user){
      res.status(404).json({
        ok: false,
        msg: 'El usuario no existe en la base de datos'
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: 'Usuario eliminado'
    })
  }catch {
    res.status(500).json({
      ok: false,
      msg: 'Error, revisar logs o contacte al administrador'
    })
  }
}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
};
