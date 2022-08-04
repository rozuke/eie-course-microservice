const { Sequelize } = require("sequelize");
const { CourseWebService } = require("../service/courseWebService");

const service = new CourseWebService();

// get FUcntions
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

const getUsersByCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const users = await service.findUsersByCourse(id);
    if (users !== null) {
      callback(null, users);
    }
  } catch (error) {
    callback(error);
  }
};

const getCoursesByTeacher = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const courses = await service.findCoursesByTeacher(id);
    if (courses !== null) {
      callback(null, courses);
    }
  } catch (error) {
    callback(error);
  }
};

const getStudentsResultByCourse = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const { id } = event.pathParameters;
    const studentsResult = await service.findStudentsResultByCourse(id);
    if (studentsResult !== null) {
      callback(null, studentsResult);
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

module.exports = {
  getCourses,
  postCourse,
  putCourse,
  deleteCourse,
  getUsersByCourse,
  getCoursesByTeacher,
  getStudentsResultByCourse,
};
