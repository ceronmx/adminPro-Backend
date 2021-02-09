/* 
    Hospitales
    ruta: /api/hospitales
*/

const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async(req, res = response) => {
  
  const hospitales = await Hospital.find()
                                   .populate('usuario', 'nombre email');

  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospitales = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospitalDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado, revise los logs o contacte al administrador",
    });
  }
};

const actualizarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospitales",
  });
};

const borrarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarHospitales",
  });
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
};
