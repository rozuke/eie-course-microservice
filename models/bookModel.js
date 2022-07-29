const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const BookSchema = sequelize.define(
  "libro",
  {
    libroId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "libro_id",
    },
    nombre: {
      type: DataTypes.STRING,
    },
    nivel: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Libro",
  }
);

module.exports = { BookSchema };
