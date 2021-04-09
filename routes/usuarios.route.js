/*
    Usuarios
    ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuarios.controller");
const { validarCampos, validarUid } = require("../middlewares/validar-campos");
const { validarJWT, 
        validarADMIN_ROLE,
        validarADMIN_sameUser } = require("../middlewares/validar-jwt");



const router = Router();

router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "Nombre obligatorio").not().isEmpty(),
    check("password", "Contraseña obligatoria").not().isEmpty(),
    check("email", "Email inválido").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_sameUser,
    check("nombre", "Nombre obligatorio").not().isEmpty(),
    // check('role', 'Rol obligatorio').isEmail(),
    check("email", "Email inválido").isEmail(),
    validarCampos,
    validarUid,
  ],
  actualizarUsuario
);
router.delete("/:id", [validarJWT, validarADMIN_ROLE], borrarUsuario);

module.exports = router;
