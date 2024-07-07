const joi = require("joi");
const companyService = require("../services/companyService");

const createCompanySchema = joi.object().keys({
  companyName: joi.string().required(),
  companyAddress: joi.string().required(),
  companyEmail: joi.string().email().required(),
  companyPhone: joi.string().required(),
  companyWebsite: joi.string().required(),
  companyDescription: joi.string().required(),
  companyPassword: joi.string().required(),
  companyPasswordConfirm: joi.ref("companyPassword"),
});

const getCompanySchema = joi.object().keys({
  companyEmail: joi.string().email().required(),
});

module.exports = {
  createCompany: async (req, res) => {
    try {
      const validate = await createCompanySchema.validateAsync(req.body);
      const company = await companyService.createCompany(validate);
      if (company.error || !company.response) {
        return res.send({
          error: { message: "cannot create", error: company.error },
        });
      }
      return res.send({ response: company.response });
    } catch (error) {
      return res.send({ error: error });
    }
  },
  getCompany: async (req, res) => {
    try {
      const validate = await getCompanySchema.validateAsync(req.query);
      const company = await companyService.getCompany(validate);
      if (company.error || !company.response) {
        return res.send({
          error: { message: "cannot get company", error: company.error },
        });
      }
      return res.send({ response: company.response });
    } catch (error) {
      return res.send({ error: error });
    }
  },
};
