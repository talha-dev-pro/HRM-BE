const router = require("express").Router();

const { createUser } = require("../Controllers/userController");

router.post("/createUser", createUser);

module.exports = router;
