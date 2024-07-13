const joi = require("joi");
const employeeServices = require("../services/employeeServices");

const createEmployeeSchema = joi.object().keys({
  employeeEmail: joi.string().email().required(),
  employeeName: joi.string().required(),
  employeePassword: joi.string().min(6).required(),
  confirmPassword: joi.ref("employeePassword"),
  companyId: joi.string().required(),
});

module.exports = {
  createEmployee: async (req, res) => {
    try {
      const validate = await createEmployeeSchema.validateAsync(req.body);
      const employee = await employeeServices.createEmployee(validate);
      if (employee.error) {
        return res.send({ error: employee.error });
      }
      return res.send({ response: employee.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  getAllEmployee: async (req, res) => {
    try {
      const employee = await employeeServices.getAllEmployee();
      if (employee.error) {
        return res.send({ error: employee.error });
      }
      return res.send({ response: employee.response });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
};
