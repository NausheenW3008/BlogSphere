const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: "" },

  author: { type: String, required: true },   // 👈 ADD THIS
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 ADD

  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Blog", blogSchema);