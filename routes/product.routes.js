const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: { products } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:product_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    res.json({ data: { product } });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;