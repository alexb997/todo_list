const express = require("express");
const connectDB = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const authRoutes = require("./routes/auth_routes");
const taskRoutes = require("./routes/task_routes");
const userRoutes = require("./routes/user_routes");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
