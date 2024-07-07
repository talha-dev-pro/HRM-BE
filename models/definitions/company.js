const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const { hash } = require("bcrypt");
const { v4: uuid } = require("uuid");

class Company extends Model {}

Company.init(
  {
    companyId: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    companyAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    companyPhone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyWebsite: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyLogo: {
      type: DataTypes.STRING(255),
    },
    companyDescription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyPasswordResetToken: {
      type: DataTypes.STRING(255),
    },
    companyPasswordResetExpires: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "company",
    timestamps: true,
    paranoid: true,
    sequelize,
  }
);

Company.beforeCreate(async (company) => {
  company.companyPassword = await hash(company.companyPassword, 10);
  company.companyId = uuid();
});

Company.afterCreate((company) => {
  delete company.dataValues.companyPassword;
});

module.exports = Company;
