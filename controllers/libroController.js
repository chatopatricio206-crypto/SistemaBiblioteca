
const Libro = require('../models/Libro');

// Registrar un libro
exports.crearLibro = async (req, res) => {
    try {
        const libro = await Libro.create(req.body);
        res.status(201).json({
            mensaje: 'Libro registrado correctamente',
            libro
        });
    } catch (error) {
        res.status(error.code === 11000 ? 409 : 400).json({
            mensaje: error.code === 11000
                ? 'El ISBN ya está registrado'
                : 'Error al registrar el libro',
            error: error.message
        });
    }
};

// Consultar todos los libros
exports.obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar libros' });
    }
};

// Consultar un libro por ID
exports.obtenerLibro = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);

        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        res.json(libro);
    } catch (error) {
        res.status(400).json({ mensaje: 'ID de libro inválido' });
    }
};

// Actualizar un libro
exports.actualizarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        res.json({
            mensaje: 'Libro actualizado correctamente',
            libro
        });
    } catch (error) {
        res.status(error.code === 11000 ? 409 : 400).json({
            mensaje: 'No se pudo actualizar el libro',
            error: error.message
        });
    }
};

// Eliminar un libro
exports.eliminarLibro = async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);

        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }

        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'ID de libro inválido' });
    }
};
