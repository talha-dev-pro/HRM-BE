const { where } = require("sequelize");
const { models } = require("./index");

module.exports = {
  createCompany: async (body) => {
    try {
      const company = await models.Company.create({ ...body });
      return {
        response: company,
      };
    } catch (error) {
      return { error: error };
    }
  },
  getCompany: async (companyEmail) => {
    try {
      const company = await models.Company.findOne({
        where: { companyEmail: companyEmail },
        include: { model: models.Users },
      });
      return { response: company };
    } catch (error) {
      return { error: error };
    }
  },
  getAllCompanies: async () => {
    try {
      const companies = await models.Company.findAll({
        include: { model: models.Users },
      });
      return { response: companies };
    } catch (error) {
      return { error: error };
    }
  },
};
