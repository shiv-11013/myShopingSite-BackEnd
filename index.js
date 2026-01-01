const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app-name.vercel.app', 
    'http://localhost:5000' 
  ],
  credentials: true
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch((err) => console.error("DB connection error:", err));


app.use("/api/product_details", productRoutes);
app.use("/api/category_details", categoryRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));