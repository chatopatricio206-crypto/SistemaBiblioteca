const express = require('express');
const router = express.Router();

const {
    crearPrestamo,
    obtenerPrestamos,
    devolverPrestamo
} = require('../controllers/prestamoController');

router.post('/', crearPrestamo);
router.get('/', obtenerPrestamos);
router.put('/:id/devolver', devolverPrestamo);

module.exports = router;