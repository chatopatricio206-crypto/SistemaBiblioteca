const mongoose = require('mongoose');

const prestamoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    libro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    },
    fechaPrestamo: {
        type: Date,
        default: Date.now
    },
    fechaDevolucion: {
        type: Date
    },
    estado: {
        type: String,
        enum: ['activo', 'devuelto'],
        default: 'activo'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prestamo', prestamoSchema);