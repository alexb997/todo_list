const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getUserProfile);

router.put("/me", authMiddleware, updateUserProfile);

router.delete("/me", authMiddleware, deleteUser);

module.exports = router;
