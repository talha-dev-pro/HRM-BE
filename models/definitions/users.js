const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
const { v4: uuid } = require("uuid");
const { hash } = require("bcrypt");
const company = require("./company");

class Users extends Model {}

Users.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    userName: {
      type: DataTypes.STRING(255),
    },
    userEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    userPassword: {
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
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

Users.beforeCreate(async (user) => {
  user.userId = uuid();
  user.userPassword = await hash(user.userPassword, 10);
});

Users.afterCreate((user) => {
  delete user.dataValues.userPassword;
});

module.exports = Users;
