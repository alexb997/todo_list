const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");

router.get("/me", getUserProfile);

router.put("/me", updateUserProfile);

router.delete("/me", deleteUser);

module.exports = router;
