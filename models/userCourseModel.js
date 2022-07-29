const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const UserCourseSchema = sequelize.define(
  "usuarioCurso",
  {
    usuarioCursoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "usuario_curso_id",
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "usuario_id",
    },
    cursoId: {
      type: DataTypes.INTEGER,
      field: "curso_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "UsuarioCurso",
  }
);
module.exports = { UserCourseSchema };
