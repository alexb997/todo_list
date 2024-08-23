const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/all", getTasks);
router.put("/update/:id", updateTask);
router.delete("/", deleteTask);

module.exports = router;
