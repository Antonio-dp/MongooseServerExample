const express = require('express')
const router = express.Router()
const VentaController = require('../controllers/VentaController')

router.post('/', VentaController.crearVenta)
router.get('/', VentaController.obtenerVentas)
router.get('/:id', VentaController.obtenerVentaPorId)
router.put('/:id', VentaController.actualizarVenta)
router.delete('/:id', VentaController.eliminarVenta)
router.post('/:id', VentaController.agregarProductosAVenta)
router.get('/:id', VentaController.obtenerDesgloseVenta)
router.get('/', VentaController.obtenerTodasLasVentasConDesglose)

module.exports = router