// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://root:pass@mongo:27017/todo-list-db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: `admin`
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
