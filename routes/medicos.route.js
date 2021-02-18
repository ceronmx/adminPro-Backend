/*
    Médicos
    ruta: /api/medicos
*/
const { Router } = require('express');
const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
} = require('../controllers/medicos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/', [

], getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'Falta nombre del médico').notEmpty(),
    check('hospital', 'El ID del hospital es inválido').isMongoId(),
    validarCampos
], crearMedicos);

router.put('/:id', [
    validarJWT,
    check('nombre', 'Falta nombre del médico').notEmpty(),
    check('hospital', 'El ID del hospital es inválido').isMongoId(),
    validarCampos
], actualizarMedicos);
router.delete('/:id', [
    validarJWT
], borrarMedicos);


module.exports = router;