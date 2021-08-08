
const { Sequelize } = require("sequelize");

module.exports = new Sequelize("testing", "root", null, {
  host: "localhost",
  dialect: "mysql",
});
