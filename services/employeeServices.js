const employeeModel = require("../models/employeeModel");

module.exports = {
  createEmployee: async (body) => {
    try {
      const isEmployee = await employeeModel.getEmployee(body.employeeEmail);
      if (isEmployee.response || isEmployee.error) {
        return { error: "Employee already exists" };
      }
      const employee = await employeeModel.createEmployee(body);
      if (employee.error || !employee.response) {
        return {
          error: {
            message: "Employee cannot be created",
            error: employee.error,
          },
        };
      }
      return {
        response: employee.response,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getAllEmployee: async () => {
    try {
      const employee = await employeeModel.getAllEmployee();
      if (employee.error || !employee.response) {
        return { error: employee.error };
      }
      return { response: employee.response };
    } catch (error) {
      return { error: error };
    }
  },
};
