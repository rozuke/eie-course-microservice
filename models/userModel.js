const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const UserSchema = sequelize.define(
  "usuario",
  {
    usuarioId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "usuario_id",
    },
    email: {
      type: DataTypes.STRING,
    },
    contrasena: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
    personaId: {
      type: DataTypes.INTEGER,
      field: "usu_persona_id",
    },
    rolId: {
      type: DataTypes.INTEGER,
      field: "usu_rol_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Usuario",
  }
);

module.exports = { UserSchema };
