/* 
    Búsquedas
    ruta: /api/todo
*/

const { response } = require("express");
const Usuario = require("../models/usuario.model");
const Medico = require("../models/medico.model");
const Hospital = require("../models/hospital.model");

const getBusqueda = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  try {
    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
    ]);

    res.json({
      ok: true,
      busqueda,
      usuarios,
      medicos,
      hospitales,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado revise logs o contacte al administrador",
    });
  }
};

const getBusquedaEsp = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  try {
    switch(tabla){
      case 'usuarios':
        data = await Usuario.find({ nombre: regex })
      break;
      case 'medicos':
        data = await Medico.find({ nombre: regex })
                           .populate('usuario', 'nombre img')
                           .populate('hospital', 'nombre img')
      break;
      case 'hospitales':
        data = await Hospital.find({ nombre: regex })
                             .populate('usuario', 'nombre img')
      break;
      default:
        return res.status(400).json({
          ok: false,
          msg: 'Tabla inexistente'
        });  
    }


    res.json({
      ok: true,
      msg: busqueda,
      data
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado revise logs o contacte al administrador'
    });
  }
};

module.exports = {
  getBusqueda,
  getBusquedaEsp,
};
