const express = require("express");
const {createUser, loginUserControl, getAllUsers} = require("../controller/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.post("/all-users", getAllUsers);

module.exports = router;
