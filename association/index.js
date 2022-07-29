const { BookSchema } = require("../models/bookModel");
const { CourseSchema } = require("../models/courseModel");
const { PersonSchema } = require("../models/personModel");
const { UserCourseSchema } = require("../models/userCourseModel");
const { UserSchema } = require("../models/userModel");

BookSchema.hasOne(CourseSchema, {
  foreignKey: {
    field: "cur_libro_id",
  },
});

CourseSchema.belongsTo(BookSchema);

PersonSchema.hasOne(UserSchema, {
  foreignKey: {
    field: "usu_persona_id",
  },
});
UserSchema.belongsTo(PersonSchema);

// user associations
UserSchema.belongsToMany(CourseSchema, {
  through: UserCourseSchema,
  foreignKey: "curso_id",
});
CourseSchema.belongsToMany(UserSchema, {
  through: UserCourseSchema,
  foreignKey: "usuario_id",
});
UserSchema.hasMany(UserCourseSchema, {
  foreignKey: {
    field: "usuario_id",
  },
});
UserCourseSchema.belongsTo(UserSchema);

CourseSchema.hasMany(UserCourseSchema, {
  foreignKey: {
    field: "curso_id",
  },
});
UserCourseSchema.belongsTo(CourseSchema);
