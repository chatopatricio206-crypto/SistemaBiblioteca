const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Registrar usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                mensaje: 'Nombre, correo y contraseña son obligatorios'
            });
        }

        const existe = await Usuario.findOne({ correo });

        if (existe) {
            return res.status(409).json({
                mensaje: 'El correo ya está registrado'
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
            nombre,
            correo,
            password: passwordEncriptada,
            rol
        });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Consultar usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar usuarios'
        });
    }
};