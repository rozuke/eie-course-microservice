const { Sequelize } = require("sequelize");
const { CourseWebService } = require("../service/courseWebService");

const service = new CourseWebService();

const getCourses = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const courses = await service.findAllCourses();
    if (courses !== null) {
      callback(null, courses);
    }
  } catch (error) {
    callback(error);
  }
};

const postCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { nombre, libroId } = JSON.parse(event.body);
    const newCourse = {
      nombre,
      estado: true,
      codigo: "cr-lv1",
      fecha: Sequelize.fn("NOW"),
      libroId,
    };

    const course = await service.createCourse(newCourse);
    if (course !== null) {
      callback(null, course);
    }
  } catch (error) {
    callback(error);
  }
};

const putCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const { nombre, libroId } = JSON.parse(event.body);
    const course = await service.updateCourse(id, {
      nombre,
      libroId,
    });
    if (course !== null) {
      callback(null, course);
    }
  } catch (error) {
    callback(error);
  }
};

const deleteCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const course = await service.destroyCourse(id);
    if (course !== null) {
      callback(null, course);
    }
  } catch (error) {
    callback(error);
  }
};

module.exports = { getCourses, postCourse, putCourse, deleteCourse };
