const router = require("express").Router();

const {
  createCompany,
  getCompany,
} = require("../controllers/companyController");

router.post("/createCompany", createCompany);
router.get("/getCompany", getCompany);

module.exports = router;
