const { Sequelize } = require("sequelize");
const { BookSchema } = require("../models/bookModel.js");
const { CourseSchema } = require("../models/courseModel.js");
const { PersonSchema } = require("../models/personModel.js");
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
    users = await UserCourseSchema.findAll({
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
          ],
        },
      ],
    });
    return users;
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
