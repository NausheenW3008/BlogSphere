require("dotenv").config(); // 👈 ADD THIS LINE
const blogRoutes = require("./routes/blogRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/blogs", blogRoutes);
// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 👇 ADD THIS BLOCK (MongoDB connect)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});