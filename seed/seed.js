require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const categoryData = require("../data/categoryData.json");
const productData = require("../data/productData.json");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✅");

    await Category.deleteMany({});
    await Product.deleteMany({});

    const insertedCategories = await Category.insertMany(categoryData);

    const categoriesMap = {};
    insertedCategories.forEach((cat) => {
      categoriesMap[cat.name] = cat._id;
    });

    const productsWithCategory = productData.map((product) => ({
      ...product,
      category: categoriesMap[product.category] || insertedCategories[0]._id,
    }));

    await Product.insertMany(productsWithCategory);

    console.log("Seeding done ✅");
    process.exit();
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seedDatabase();