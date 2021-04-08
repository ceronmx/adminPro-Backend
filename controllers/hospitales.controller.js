/* 
    Hospitales
    ruta: /api/hospitales
*/

const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");

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

const actualizarHospitales = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const cambios = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambios, {
      new: true,
    });

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revise logs o contacte al administrador",
    });
  }
};

const borrarHospitales = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      res.status(404).json({
        ok: true,
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id)

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error inesperado, revise logs o contacte al administrador",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
};
