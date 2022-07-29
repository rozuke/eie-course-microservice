const { Sequelize } = require("sequelize");

const { config } = require("./config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
  logging: false,
});

// setupModels(sequelize);

sequelize.sync({ force: false });

module.exports = { sequelize };
