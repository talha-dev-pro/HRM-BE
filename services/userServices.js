const userModel = require("../models/userModel");

module.exports = {
  createUser: async (body) => {
    try {
      const isUser = await userModel.getUser(body.userEmail);
      if (isUser.response || isUser.error) {
        console.log(isUser);
        return { error: "User already exists" };
      }
      const user = await userModel.createUser(body);
      if (user.error || !user.response) {
        return {
          error: {
            message: "User cannot be created",
            error: user.error,
          },
        };
      }
      return {
        response: user.response,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getAllUsers: async () => {
    try {
      const users = await userModel.getAllUsers();
      if (users.error || !users.response) {
        return { error: users.error };
      }
      return { response: users.response };
    } catch (error) {
      return { error: error };
    }
  },
};
