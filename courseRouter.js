const { CourseSchema } = require('./courseModel.js');

const getCourse = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        const course = await CourseSchema.findAll();
        const response = {status: 200, body: {course}}
        return response
    }catch (error){
        console.log(error)
    }
    
}

const addCourse = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { nombre, estado, codigo, libroId } = JSON.parse(event.body);
    const newCourse = {
        nombre,
        estado,
        codigo,
        libroId
    }
    console.log('Creando el puto curso')
    const course = await CourseSchema.create(newCourse)
    if(course !== null) {
        callback(null, {status: 200, body: {course}});
    }
    callback(new Error('No se pudo crear el curso'));
    
}

const updateCourse = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

        const { id } = event.pathParameters;
        const { nombre, estado, codigo, libroId } =  JSON.parse(event.body);

        const newCourseData = { nombre, estado, codigo, libroId};

        const user = await CourseSchema.findByPk(id);
        const res = await user.update(newCourseData);

        if (res !== null) {
            callback(null, {status: 200, body: {res}});
        }
            callback(new Error('No se pudo actualizar el curso'));
}


const deleteCourse = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { id } = event.pathParameters;

    const course = await CourseSchema.findByPk(id)
    const response = course.destroy();
    if (response !== null) {
        callback(null, {status: 200, body: {response}});
    }
        callback(new Error('No se pudo eliminar el curso'));
}

const updateRecordCourse = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { id } = event.pathParameters;
    const newCourseData =  JSON.parse(event.body);
    const course = service.updateRecord(id, newCourseData);

    return {status: 200, body: {course}}
}


module.exports = {
    getCourse,
    addCourse,
    updateCourse,
    updateRecordCourse,
    deleteCourse
}