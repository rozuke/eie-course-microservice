const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const RolSchema = sequelize.define(
  "rol",
  {
    rolId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "rol_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    codigo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Rol",
  }
);

module.exports = { RolSchema };
