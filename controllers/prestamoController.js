
const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');

// Registrar préstamo
exports.crearPrestamo = async (req, res) => {
    try {
        const { usuario, libro } = req.body;

        if (!usuario || !libro) {
            return res.status(400).json({
                mensaje: 'El usuario y el libro son obligatorios'
            });
        }

        const libroEncontrado = await Libro.findById(libro);

        if (!libroEncontrado) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            });
        }

        if (!libroEncontrado.disponible) {
            return res.status(409).json({
                mensaje: 'El libro no está disponible'
            });
        }

        const nuevoPrestamo = await Prestamo.create({
            usuario,
            libro
        });

        libroEncontrado.disponible = false;
        await libroEncontrado.save();

        // Notificación en tiempo real
        const io = req.app.get('io');

        if (io) {
            io.emit('prestamoCreado', {
                mensaje: 'Se ha registrado un nuevo préstamo'
            });
        }

        res.status(201).json({
            mensaje: 'Préstamo registrado correctamente',
            prestamo: nuevoPrestamo
        });

    } catch (error) {
        res.status(400).json({
            mensaje: 'No se pudo registrar el préstamo',
            error: error.message
        });
    }
};

// Consultar préstamos
exports.obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.find()
            .populate('usuario', 'nombre correo')
            .populate('libro', 'titulo autor');

        res.json(prestamos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar préstamos'
        });
    }
};

// Devolver un libro
exports.devolverPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.id);

        if (!prestamo) {
            return res.status(404).json({
                mensaje: 'Préstamo no encontrado'
            });
        }

        if (prestamo.estado === 'devuelto') {
            return res.status(409).json({
                mensaje: 'Este libro ya fue devuelto'
            });
        }

        prestamo.estado = 'devuelto';
        prestamo.fechaDevolucion = new Date();

        await prestamo.save();

        await Libro.findByIdAndUpdate(prestamo.libro, {
            disponible: true
        });

        // Notificación en tiempo real
        const io = req.app.get('io');

        if (io) {
            io.emit('libroDevuelto', {
                mensaje: 'Un libro ha sido devuelto'
            });
        }

        res.json({
            mensaje: 'Libro devuelto correctamente',
            prestamo
        });

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al devolver el libro',
            error: error.message
        });
    }
};
