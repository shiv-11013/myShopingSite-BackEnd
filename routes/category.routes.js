const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ data: { categories } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/:category_id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id);
    res.json({ data: { category } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

module.exports = router;