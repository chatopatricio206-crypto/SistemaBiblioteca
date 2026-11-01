const express = require('express');
const router = express.Router();

const {
    crearUsuario,
    obtenerUsuarios
} = require('../controllers/usuarioController');

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);

module.exports = router;