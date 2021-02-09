/*
    Médicos
    ruta: /api/medicos
*/
const { response } = require("express");
const Medico = require("../models/medico.model");

const getMedicos = async(req, res = response) => {

  const medicos = await Medico.find()
                              .populate('usuario', 'nombre img')
                              .populate('hospital', 'nombre img')

                  

  res.json({
    ok: true,
    medicos
  });
};

const crearMedicos = async(req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inseperado revise logs o contacte al administrador",
    });
  }
};

const actualizarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedicos",
  });
};

const borrarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarMedicos",
  });
};

module.exports = {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
};
