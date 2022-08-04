const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
const { BookSchema } = require("../models/bookModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { PersonSchema } = require("../models/personModel.js");
const { ResultSchema } = require("../models/resultModel.js");
const { RolSchema } = require("../models/rolModel.js");
const { UserCourseSchema } = require("../models/userCourseModel.js");
const { UserSchema } = require("../models/userModel.js");
require("../association");
class CourseWebService {
  // Find Functions
  async findAllCourses() {
    return await CourseSchema.findAll({
      include: [
        {
          model: BookSchema,
          attributes: [],
        },
      ],
      attributes: [
        "cursoId",
        "nombre",
        "estado",
        "fecha",
        [Sequelize.col("libro.nombre"), "nombreLibro"],
        [Sequelize.col("libro.nivel"), "nivel"],
      ],
    });
  }

  async findUsersByCourse(courseId) {
    const users = await UserCourseSchema.findAll({
      where: {
        cursoId: courseId,
      },
      include: [
        {
          model: UserSchema,
          attributes: [],
          include: [
            {
              model: PersonSchema,
              attributes: [],
            },
            {
              model: RolSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "usuarioId",
        [Sequelize.col("usuario.persona.nombre"), "nombre"],
        [Sequelize.col("usuario.persona.apellido_paterno"), "apellidoPaterno"],
        [Sequelize.col("usuario.persona.apellido_materno"), "apellidoMaterno"],
        [Sequelize.col("usuario.email"), "email"],
        [Sequelize.col("usuario.persona.tipo"), "tipo"],
        [Sequelize.col("usuario.rol.nombre"), "rol"],
      ],
    });
    return users;
  }

  async findCoursesByTeacher(teacherId) {
    const courses = await UserCourseSchema.findAll({
      where: {
        usuarioId: teacherId,
      },
      include: [
        {
          model: CourseSchema,
          attributes: [],
        },
      ],
      attributes: [
        "cursoId",
        [sequelize.col("curso.nombre"), "nombre"],
        [sequelize.col("curso.estado"), "estado"],
        [sequelize.col("curso.cur_libro_id"), "libroId"],
      ],
    });
    return courses;
  }

  async findStudentsResultByCourse(courseId) {
    const students = await UserCourseSchema.findAll({
      where: {
        cursoId: courseId,
      },
      include: [
        {
          model: UserSchema,
          where: {
            rolId: 1,
          },
          attributes: [],
          include: [
            {
              model: ResultSchema,
              attributes: [],
            },
            {
              model: PersonSchema,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        "usuarioId",
        [
          Sequelize.fn(
            "concat",
            Sequelize.col("usuario.persona.nombre"),
            " ",
            Sequelize.col("usuario.persona.apellido_paterno"),
            " ",
            Sequelize.col("usuario.persona.apellido_materno")
          ),
          "nombre",
        ],
        [Sequelize.col("usuario.estado"), "estado"],
        [
          Sequelize.col("usuario.resultado.cantidad_participacion"),
          "totalParticipaciones",
        ],
        [Sequelize.col("usuario.resultado.nota_homework"), "notaHomework"],
        [Sequelize.col("usuario.resultado.nota_ee"), "notaEE"],
        [Sequelize.col("usuario.resultado.nota_laboratory"), "notaLaboratory"],
      ],
    });
    return students;
  }
  // Creaate Functions

  async createCourse(courseData) {
    return await CourseSchema.create(courseData);
  }

  // Update Functions

  async updateCourse(id, courseData) {
    const course = await CourseSchema.findByPk(id);

    return await course.update(courseData);
  }

  async destroyCourse(id) {
    const course = await CourseSchema.findByPk(id);
    if (!course) {
      return { message: "Course not found" };
    }
    await course.destroy();
    return { message: "Course deleted" };
  }
}

module.exports = { CourseWebService };
