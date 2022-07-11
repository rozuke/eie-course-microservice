const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize')

const CourseSchema = sequelize.define( 'Cursos', {
    cursoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'curso_id'
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    estado: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    codigo: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    libroId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'libro_id'
    }
}, {
    timestamps: false
});

module.exports = { CourseSchema }