const { models } = require("./index");

module.exports = {
  createUser: async (body) => {
    try {
      const user = await models.users.create({ ...body });
      return {
        response: user,
      };
    } catch (error) {
      return error;
    }
  },
  getUser: async (body) => {
    try {
      const user = await models.users.findOne({
        where: { email: body.email },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return error;
    }
  },
  getAllUsers: async () => {
    try {
      const users = await models.users.findAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      return {
        response: users,
      };
    } catch (error) {
      return error;
    }
  },
};
