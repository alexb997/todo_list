const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth_routes");
const taskRoutes = require("./routes/task_routes");
const userRoutes = require("./routes/user_routes");
const { connectRabbitMQ } = require("./config/rabbitmq");
const cors = require("cors");


const app = express();

// Connect Database
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
