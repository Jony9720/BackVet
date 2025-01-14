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

sequelize.sync({ alter: true })
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error al sincronizar la base de datos:', err));

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumenta el límite si las firmas son grandes
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/', rootRoute); // Usa la ruta raíz desde el archivo modularizado
app.use('/api/jaulas', jaulasRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/archivados', serviciosArchivados);
app.use('/api/auth', authRoutes.router);

// Exportar la aplicación en lugar de iniciar el servidor
module.exports = app;
