const express = require("express");
const {createUser, loginUserControl, getAllUsers, getAUser, deleteAUser} = require("../controller/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/all-users", getAllUsers);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);

module.exports = router;
