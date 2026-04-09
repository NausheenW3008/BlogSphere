const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");


// 🟢 CREATE BLOG
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
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
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;