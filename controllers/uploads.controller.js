/* 
    Upload
    ruta: /api/upload
*/
const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/imagenes")

const subirArchivo = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo inválido",
    });
  }

  //validar que la petición contenga un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "Petición sin archivo",
    });
  }

  // Validar archivo
  const file = req.files.imagen;

  const nombreCortado = file.name.split(".");
  const extensionFile = nombreCortado[nombreCortado.length - 1];

  const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
  if (!extensionesValidas.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg:
        'Tipo de archivo inválido, archivos permitidos (png, jpg, jpeg, gif, svg)',
    });
  }

  // Generar nombre del archivo
  const fileName = `${uuidv4()}.${extensionFile}`;

  // Path de la imagen
  const path = `./uploads/${tipo}/${fileName}`;

  // Mover la imagen

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error inesperado revise logs o contacte al administrador",
      });
    }

    actualizarImagen(tipo, id, fileName);



    return res.json({
      ok: true,
      msg: 'Archivo cargado con éxito',
      fileName,
    });
  });
};


const mostrarImagen = (req, res = response) => {
  const { tipo, foto } = req.params;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  if (fs.existsSync(pathImg)){
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg)
  }

}

module.exports = {
  subirArchivo,
  mostrarImagen
};
