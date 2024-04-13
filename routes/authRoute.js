const express = require("express");
const {
  createUser,
  loginUserControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUserControl,
} = require("../controller/userController");

const {authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserControl);
router.get("/logout", logoutUserControl);

router.get("/all-users", getAllUsers);

router.get("/refresh", handleRefreshToken);


router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/:id", deleteAUser);
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
