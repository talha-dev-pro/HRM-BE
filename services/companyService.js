const companyModel = require("../models/companyModel");

module.exports = {
  createCompany: async (body) => {
    try {
      const isCompany = await companyModel.getCompany(body.companyEmail);
      if (isCompany.response || isCompany.error) {
        return {
          error: {
            message: "Company already created",
            error: isCompany.error,
          },
        };
      }
      const company = await companyModel.createCompany(body);
      return { response: company.response };
    } catch (error) {
      return { error: error };
    }
  },
  getCompany: async (body) => {
    try {
      const company = await companyModel.getCompany(body.companyEmail);
      if (company.error || !company.response) {
        return { error: company.error };
      }
      return { response: company.response };
    } catch (error) {
      return { error: error };
    }
  },
};
