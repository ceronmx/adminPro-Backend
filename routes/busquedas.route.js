/* 
    Búsquedas
    ruta: /api/todo
*/
const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-jwt')
const { 
    getBusqueda,
    getBusquedaEsp
} = require('../controllers/busquedas.controller')


const router = Router();

router.get('/:busqueda',[
    validarJWT
], getBusqueda)
router.get('/coleccion/:tabla/:busqueda',[
    validarJWT
], getBusquedaEsp)

module.exports = router;