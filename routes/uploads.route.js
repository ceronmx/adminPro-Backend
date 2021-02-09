/* 
    Upload
    ruta: /api/upload
*/
const { Router }       = require("express");
const { validarJWT }   = require("../middlewares/validar-jwt");
const { subirArchivo, mostrarImagen } = require("../controllers/uploads.controller");
const fileUpload       = require("express-fileupload");

const router = Router();
router.use(fileUpload());


router.put("/:tipo/:id", validarJWT, subirArchivo);
router.get("/:tipo/:foto", mostrarImagen);

module.exports = router;
