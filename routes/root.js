const express = require('express');
const router = express.Router();

// Definir la ruta raíz
router.get('/', (req, res) => {
    res.send('Bienvenido a la API de grooming. Usa las rutas en /api para interactuar con el sistema.');
});

module.exports = router;
