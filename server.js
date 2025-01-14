const express = require('express');
const sequelize = require('./config/db');
const jaulasRoutes = require('./routes/jaulas');
const personalRoutes = require('./routes/personal');
const mascotasRoutes = require('./routes/mascotas');
const serviciosRoutes = require('./routes/Servicios');
const serviciosArchivados = require('./routes/Servicios');
const authRoutes = require('./routes/auth');
const rootRoute = require('./routes/root'); // Importar la ruta raíz
const cors = require('cors');
const { Mascotas, Servicios, Jaulas, Personal } = require('./models/index');

const app = express();

// Configuración de la base de datos
sequelize.sync({ alter: true })
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error al sincronizar la base de datos:', err));

// Configuración de CORS
app.use(cors({
    origin: 'https://back-vet-lovat.vercel.app/', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir credenciales
}));

// Manejar solicitudes OPTIONS (preflight)
app.options('*', cors()); // Habilita CORS para solicitudes OPTIONS

// Configuración de Express
app.use(express.json({ limit: '10mb' })); // Aumenta el límite si las firmas son grandes
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Declaración de rutas
app.use('/', rootRoute); // Usa la ruta raíz desde el archivo modularizado
app.use('/api/jaulas', jaulasRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/archivados', serviciosArchivados);
app.use('/api/auth', authRoutes.router);

// Exportar la aplicación en lugar de iniciar el servidor
module.exports = app;
