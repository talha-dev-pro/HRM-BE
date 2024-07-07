const sequelize = require("../bin/dbConnection");

const Users = require("./definitions/users");
const Company = require("./definitions/company");

Company.hasMany(Users, { foreignKey: "companyId" });
Users.belongsTo(Company, { foreignKey: "companyId" });

const models = { Users, Company };

const db = {};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models };
