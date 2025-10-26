// updateRatings.js
// Place this file in: backend/seed/updateRatings.js
// Run: node seed/updateRatings.js

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product.model");

async function updateRatings() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✅");

    // Product IDs with their ratings (from your JSON)
    const ratingsMap = {
      "60c72b2f9f1b2c0015b6b3e1": 4,  // Men's Classic Denim Jacket
      "60c72b2f9f1b2c0015b6b3e2": 5,  // Men's Black Leather Biker Jacket
      "60c72b2f9f1b2c0015b6b3e3": 4,  // Men's Organic Cotton T-Shirt
      "60c72b2f9f1b2c0015b6b3e4": 4,  // Men's Slim Fit Stretch Jeans
      "60c72b2f9f1b2c0015b6b3e5": 5,  // Men's Performance Sports Hoodie
      "60c72b2f9f1b2c0015b6b3e6": 4,  // Men's Linen Formal Shirt
      "60c72b2f9f1b2c0015b6b3e7": 4,  // Men's Jogger Track Pants
      "60c72b2f9f1b2c0015b6b3e8": 5,  // Men's Slim Fit Wool Blazer
      "60c72b2f9f1b2c0015b6b3e9": 4,  // Women's Floral Maxi Dress
      "60c72b2f9f1b2c0015b6b3ea": 5,  // Women's Genuine Leather Handbag
      "60c72b2f9f1b2c0015b6b3eb": 4,  // Women's Ribbed Knit Casual Top
      "60c72b2f9f1b2c0015b6b3ec": 4,  // Women's Brown Suede Biker Jacket
      "60c72b2f9f1b2c0015b6b3ed": 5,  // Women's Banarasi Silk Saree
      "60c72b2f9f1b2c0015b6b3ee": 4,  // Women's Stiletto High Heels
      "60c72b2f9f1b2c0015b6b3ef": 4,  // Women's Cateye Polarized Sunglasses
      "60c72b2f9f1b2c0015b6b3f0": 4,  // Women's Minimalist Analog Watch
      "60c72b2f9f1b2c0015b6b411": 5,  // Kids Denim Dungaree Set
      "60c72b2f9f1b2c0015b6b412": 4,  // Kids Cartoon Printed T-Shirt Pack
      "60c72b2f9f1b2c0015b6b413": 5,  // Kids Winter Puffer Jacket
      "60c72b2f9f1b2c0015b6b414": 4,  // Kids Sports Tracksuit Set
      "60c72b2f9f1b2c0015b6b415": 5,  // Kids Party Wear Frock Dress
      "60c72b2f9f1b2c0015b6b416": 4,  // Kids School Backpack
      "60c72b2f9f1b2c0015b6b417": 5,  // Kids Sneakers (Light-Up)
      "60c72b2f9f1b2c0015b6b418": 4,  // Kids Raincoat with Hood
      "60c72b2f9f1b2c0015b6b3f1": 5,  // MacBook Air M3
      "60c72b2f9f1b2c0015b6b3f2": 5,  // Dell XPS 13 Plus
      "60c72b2f9f1b2c0015b6b3f3": 4,  // HP Spectre x360
      "60c72b2f9f1b2c0015b6b3f4": 5,  // Lenovo ThinkPad X1 Carbon
      "60c72b2f9f1b2c0015b6b3f5": 4,  // Asus ZenBook 14 OLED
      "60c72b2f9f1b2c0015b6b3f6": 4,  // Acer Swift 5
      "60c72b2f9f1b2c0015b6b3f7": 4,  // Microsoft Surface Laptop 5
      "60c72b2f9f1b2c0015b6b3f8": 5,  // Razer Blade 15
      "60c72b2f9f1b2c0015b6b3f9": 5,  // Sony WH-1000XM5 Headphones
      "60c72b2f9f1b2c0015b6b3fa": 5,  // iPhone 15 Pro
      "60c72b2f9f1b2c0015b6b3fb": 5,  // Samsung Galaxy S24 Ultra
      "60c72b2f9f1b2c0015b6b3fc": 4,  // Apple Watch Series 9
      "60c72b2f9f1b2c0015b6b3fd": 4,  // JBL Flip 6 Speaker
      "60c72b2f9f1b2c0015b6b3fe": 5,  // Canon EOS 90D Camera
      "60c72b2f9f1b2c0015b6b3ff": 4,  // Samsung 55-inch TV
      "60c72b2f9f1b2c0015b6b400": 4,  // Amazon Echo Dot
      "60c72b2f9f1b2c0015b6b419": 5,  // iPhone 14
      "60c72b2f9f1b2c0015b6b420": 5,  // OnePlus 12 5G
      "60c72b2f9f1b2c0015b6b421": 5,  // Google Pixel 8 Pro
      "60c72b2f9f1b2c0015b6b422": 4,  // Xiaomi 13T Pro 5G
      "60c72b2f9f1b2c0015b6b423": 4,  // Realme GT 3
      "60c72b2f9f1b2c0015b6b424": 5,  // Vivo X100 Pro
      "60c72b2f9f1b2c0015b6b425": 4,  // Motorola Edge 40 Pro
      "60c72b2f9f1b2c0015b6b426": 4,  // Nothing Phone (2)
      "60c72b2f9f1b2c0015b6b401": 4,  // The Trial - Franz Kafka
      "60c72b2f9f1b2c0015b6b402": 4,  // Metamorphosis
      "60c72b2f9f1b2c0015b6b403": 4,  // The Castle
      "60c72b2f9f1b2c0015b6b404": 4,  // The Power of Habit
      "60c72b2f9f1b2c0015b6b405": 5,  // Atomic Habits
      "60c72b2f9f1b2c0015b6b406": 4,  // The Subtle Art
      "60c72b2f9f1b2c0015b6b407": 5,  // Think Like a Monk
      "60c72b2f9f1b2c0015b6b408": 5,  // Ikigai
      "60c72b2f9f1b2c0015b6b427": 5,  // Coffee Table
      "60c72b2f9f1b2c0015b6b428": 5,  // Memory Foam Mattress
      "60c72b2f9f1b2c0015b6b429": 4,  // LED Smart Table Lamp
      "60c72b2f9f1b2c0015b6b430": 4,  // Bohemian Cotton Area Rug
      "60c72b2f9f1b2c0015b6b431": 4,  // Ceramic Dinner Set
      "60c72b2f9f1b2c0015b6b432": 4,  // Wall-Mounted Floating Shelves
      "60c72b2f9f1b2c0015b6b433": 4,  // Velvet Throw Cushion Covers
      "60c72b2f9f1b2c0015b6b434": 5   // Aromatherapy Essential Oil Diffuser
    };

    console.log("Starting ratings update...\n");
    
    let updatedCount = 0;
    let notFoundCount = 0;

    // Update each product
    for (const [productId, rating] of Object.entries(ratingsMap)) {
      const result = await Product.updateOne(
        { _id: productId },
        { $set: { rating: rating } },
        { strict: false } // This allows adding new fields even if not in schema
      );

      if (result.matchedCount > 0) {
        updatedCount++;
        console.log(`✅ Updated ${productId} with rating ${rating}`);
      } else {
        notFoundCount++;
        console.log(`⚠️  Product ${productId} not found`);
      }
    }

    console.log("\n📊 Summary:");
    console.log(`✅ Successfully updated: ${updatedCount} products`);
    console.log(`⚠️  Not found: ${notFoundCount} products`);
    console.log("\n✨ Ratings update complete!");
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating ratings:", error);
    mongoose.connection.close();
    process.exit(1);
  }
}

updateRatings();