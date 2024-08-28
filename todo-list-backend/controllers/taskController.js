const Task = require("../models/Task");
const { getChannel } = require("../config/rabbitmq");
const userId = process.env.HARDCODED_ID;

exports.createTask = async (req, res) => {
  const { title, description, createdBy, editedBy, startDate, endDate } =
    req.body;
  try {
    const task = new Task({
      title,
      description,
      user: userId,
      createdBy,
      editedBy,
      startDate,
      endDate,
    });
    await task.save();

    try {
      const channel = getChannel();
      channel.sendToQueue(
        "task_queue",
        Buffer.from(JSON.stringify({ taskId: task._id, action: "create" }))
      );
    } catch (err) {
      console.error("Failed to send message to RabbitMQ", err.message);
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { startDate, endDate, editedBy } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      {
        ...req.body,
        lastEditedAt: Date.now(),
        startDate: startDate || task.startDate,
        endDate: endDate || task.endDate,
        editedBy: editedBy || task.editedBy,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const channel = getChannel();
    channel.sendToQueue(
      "tasks_queue",
      Buffer.from(JSON.stringify({ taskId: task._id, action: "update" }))
    );

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksDueBetweenDates = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const tasks = await Task.find({
      user: userId,
      endDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTasksDueOnDate = async (req, res) => {
  const { date } = req.query;
  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999); // End of the day

    const tasks = await Task.find({
      user: userId,
      endDate: { $gte: start, $lte: end },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

xports.getTasksCreatedBetweenDates = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const tasks = await Task.find({
      user: userId,
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasksCreatedOnDate = async (req, res) => {
  const { date } = req.query;
  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const tasks = await Task.find({
      user: userId,
      createdAt: { $gte: start, $lte: end },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const channel = getChannel();
    channel.sendToQueue(
      "tasks_queue",
      Buffer.from(JSON.stringify({ taskId: task._id, action: "delete" }))
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
