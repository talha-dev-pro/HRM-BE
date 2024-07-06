const joi = require("joi");
const userServices = require("../services/userServices");

const createUserSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.ref("password"),
});

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      const user = await userServices.createUser(validate);
      if (user.error) {
        return res.send({ error: user.error });
      }
      return res.send({ response: user.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userServices.getAllUsers();
      if (users.error) {
        return res.send({ error: users.error });
      }
      return res.send({ response: users.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
};
