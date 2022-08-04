const { sequelize } = require("../sequelize");
const { DataTypes } = require("sequelize");

const ResultSchema = sequelize.define(
  "resultado",
  {
    resultadoId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "resultado_id",
    },
    notaHomework: {
      type: DataTypes.SMALLINT,
      field: "nota_homework",
    },
    notaEE: {
      type: DataTypes.SMALLINT,
      field: "nota_ee",
    },
    notaLaboratory: {
      type: DataTypes.SMALLINT,
      field: "nota_laboratory",
    },
    cantidadParticipacion: {
      type: DataTypes.SMALLINT,
      field: "cantidad_participacion",
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      field: "res_usuario_id",
    },
    valoracionId: {
      type: DataTypes.INTEGER,
      field: "res_valoracion_id",
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Resultado",
  }
);

module.exports = { ResultSchema };
