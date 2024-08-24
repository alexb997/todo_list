const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/all", getTasks);
router.get("/:id", getTaskById);
router.put("/update/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
