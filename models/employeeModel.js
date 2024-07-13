const { models } = require("./index");

module.exports = {
  createEmployee: async (body) => {
    try {
      const employee = await models.Employee.create({ ...body });
      return {
        response: employee,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getEmployee: async (employeeEmail) => {
    try {
      const employee = await models.Employee.findOne({
        where: { employeeEmail: employeeEmail },
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      return {
        response: employee,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getAllEmployee: async () => {
    try {
      const employee = await models.Employee.findAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt", "password"],
        },
      });
      console.log("check");
      console.log(employee);
      return {
        response: employee,
      };
    } catch (error) {
      return { error: error };
    }
  },
};
