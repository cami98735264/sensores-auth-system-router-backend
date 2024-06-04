const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('sensores', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = sequelize;
  