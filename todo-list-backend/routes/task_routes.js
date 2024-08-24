const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddlware");
const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/all", getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
