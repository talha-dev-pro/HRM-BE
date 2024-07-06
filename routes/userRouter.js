const router = require("express").Router();

const { createUser, getAllUsers } = require("../Controllers/userController");

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
