/*
    Auth
    ruta: /api/login
*/
const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generaJWT } = require("../helpers/jwt");

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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revise logs o contacte al administrador",
    });
  }
};

module.exports = {
  login,
};
