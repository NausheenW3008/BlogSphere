const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { upload } = require("../cloudinary");

// 🟢 CREATE BLOG (with optional image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const blog = new Blog({ title, content, imageUrl });
    const savedBlog = await blog.save();
    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 DELETE BLOG
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟡 UPDATE BLOG
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;