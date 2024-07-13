const router = require("express").Router();

const {
  createEmployee,
  getAllEmployee,
} = require("../controllers/employeeController");

router.post("/createEmployee", createEmployee);
router.get("/getAllEmployee", getAllEmployee);

module.exports = router;
