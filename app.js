require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const conectarDB = require('./config/database');

const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const app = express();
const servidor = http.createServer(app);

const io = new Server(servidor, {
    cors: {
        origin: '*'
    }
});
app.set('io', io);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sesiones'
    }),

    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));
app.use('/api/libros', require('./routes/libroRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/prestamos', require('./routes/prestamoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Biblioteca funcionando correctamente'
    });
});

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const PORT = process.env.PORT || 3000;

conectarDB().then(() => {
    servidor.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});