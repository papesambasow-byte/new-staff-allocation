const { Sequelize } = require("sequelize");

const db = new Sequelize('staffAllcoationDB', 'conteh', 'Root@123456', {
  host: '172.25.101.112',
  dialect: 'mysql',
});


module.exports = db;


