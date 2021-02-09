/* 
    Hospitales
    ruta: /api/hospitales
*/
const  { Router } = require('express');
const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controllers/hospitales.controller')

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();


router.get('/',[

], getHospitales);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
    validarCampos
], crearHospitales);

router.put('/:id',[

], actualizarHospitales);

router.delete('/:id',[

], borrarHospitales);

module.exports = router;