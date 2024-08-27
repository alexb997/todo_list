const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    lastEditedAt: {
      type: Date,
      default: Date.now,
    },
    editedBy: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.pre("save", function (next) {
  this.lastEditedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
