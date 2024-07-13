const sequelize = require("../bin/dbConnection");

const Employee = require("./definitions/employee");
const Company = require("./definitions/company");

Company.hasMany(Employee, { foreignKey: "companyId" });
Employee.belongsTo(Company, { foreignKey: "companyId" });

const models = { Employee, Company };

const db = {};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };
