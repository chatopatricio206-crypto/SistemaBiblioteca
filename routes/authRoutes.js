const express = require('express');
const router = express.Router();

const {
    iniciarSesion,
    cerrarSesion
} = require('../controllers/authController');

router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);

module.exports = router;