const { models } = require("./index");

module.exports = {
  createUser: async (body) => {
    try {
      const user = await models.Users.create({ ...body });
      return {
        response: user,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getUser: async (userEmail) => {
    try {
      const user = await models.Users.findOne({
        where: { userEmail: userEmail },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getAllUsers: async () => {
    try {
      const users = await models.Users.findAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      return {
        response: users,
      };
    } catch (error) {
      return { error: error };
    }
  },
};
