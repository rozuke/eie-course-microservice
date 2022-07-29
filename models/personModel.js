const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const PersonSchema = sequelize.define(
  "persona",
  {
    personaId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "persona_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellidoPaterno: {
      type: DataTypes.STRING,
      field: "apellido_paterno",
    },
    apellidoMaterno: {
      type: DataTypes.STRING,
      field: "apellido_materno",
    },
    tipo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Persona",
  }
);

module.exports = { PersonSchema };
