const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mascotas = sequelize.define('Mascotas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    propietario_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    propietario_contacto: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    domicilio: { // Agregar el nuevo campo aquí
        type: DataTypes.STRING,
        allowNull: false,
    },
});



module.exports = Mascotas;
