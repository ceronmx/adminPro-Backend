/*
    Médicos
    ruta: /api/medicos
*/
const { response } = require("express");
const Medico = require("../models/medico.model");
const Hospital = require("../models/hospital.model");

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

const actualizarMedicos = async (req, res = response) => {
  const medicoId = req.params.id;
  const hospitalId = req.body.hospital;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(medicoId);
    const hospital = await Hospital.findById(hospitalId);
    if  (!medico || !hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital o médico no encontrado",
      }); 
    }

    const cambios = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambios, {new: true});

     res.json({
      ok: true,
      msg: "actualizarMedicos",
      medico: medicoActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revise los logs o contacte al administrador",
    });  
  }
};

const borrarMedicos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);
    if(!medico){
      res.status(404).json({
        ok: false,
        msg: "Médico no encontrado",
      });  
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Médico eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, revise los logs o contacte al administrador",
    });  
  }



};

module.exports = {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
};
