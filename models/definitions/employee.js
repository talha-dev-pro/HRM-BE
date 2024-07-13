const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const { v4: uuid } = require("uuid");
const { hash } = require("bcrypt");
const company = require("./company");

class Employee extends Model {}

Employee.init(
  {
    employeeId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    employeeName: {
      type: DataTypes.STRING(255),
    },
    employeeEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    employeePassword: {
      type: DataTypes.STRING(255),
      // allowNull: false,
    },
    companyId: {
      type: DataTypes.STRING(255),
      // allowNull: false,
      references: {
        model: company,
        key: "companyId",
      },
    },
  },
  {
    sequelize,
    tableName: "employee",
    timestamps: true,
    paranoid: true,
  }
);

Employee.beforeCreate(async (employee) => {
  employee.employeeId = uuid();
  employee.employeePassword = await hash(employee.employeePassword, 10);
});

Employee.afterCreate((employee) => {
  delete employee.dataValues.employeePassword;
});

module.exports = Employee;
