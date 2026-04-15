require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json()); // 👈 this must be here
app.use(express.static("../"));

// Routes
app.use("/blogs", blogRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});