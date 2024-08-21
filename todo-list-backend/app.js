const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth_routes');
const taskRoutes = require('./routes/task_routes');
const userRoutes = require('./routes/user_routes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

require('dotenv').config();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/users', authMiddleware, userRoutes);

module.exports = app;