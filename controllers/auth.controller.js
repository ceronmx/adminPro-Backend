/*
    Auth
    ruta: /api/login
*/
const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generaJWT } = require("../helpers/jwt");
const { verify } = require("../helpers/google");
const { getFrontEndMenu } = require("../helpers/frontend-menu");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      res.status(400).json({
        ok: false,
        msg: "Verifique credenciales",
      });
    }

    //Verificar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "Verifique credenciales",
      });
    }

    //generar JWT
    const token = await generaJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
      menu: getFrontEndMenu(usuarioDB.role)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revise logs o contacte al administrador",
    });
  }
};

const googleSignIn = async(req, res = response) => {
  const token = req.body.token;

  try {
    const { email, name, picture } = await verify(token);

    const usuarioDb = await Usuario.findOne({email});
    let usuario;

    if ( !usuarioDb ) {
      usuario = new Usuario({
        nombre: name, 
        email,
        img: picture,
        password: '@@@',
        google: true
      });
    } else {
      usuario = usuarioDb;
      usuario.google = true;
    } 

    // Guardar usuario en DB
    await usuario.save();

    // Generar jwt
    const jwt = await generaJWT(usuario.id)

    res.json({
      ok: true,
      jwt,
      menu: getFrontEndMenu(usuario.role)
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    });
  }
}


const renewToken = async (req, res = response) => {
  uid = req.uid;
  try {
    token = await generaJWT(uid);
    const usuario = await Usuario.findById(uid); 
  
    res.json({
      ok: true,
      token,
      usuario,
      menu: getFrontEndMenu(usuario.role)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado, revise logs o contacte al administrador'
    });
  }


}


module.exports = {
  login,
  googleSignIn,
  renewToken
};
