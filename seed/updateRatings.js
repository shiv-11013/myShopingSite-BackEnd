
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product.model");

async function updateRatings() {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✅");

  
    const ratingsMap = {
      "60c72b2f9f1b2c0015b6b3e1": 4,  
      "60c72b2f9f1b2c0015b6b3e2": 5,  
      "60c72b2f9f1b2c0015b6b3e3": 4,  
      "60c72b2f9f1b2c0015b6b3e4": 4,  
      "60c72b2f9f1b2c0015b6b3e5": 5,  
      "60c72b2f9f1b2c0015b6b3e6": 4,  
      "60c72b2f9f1b2c0015b6b3e7": 4,  
      "60c72b2f9f1b2c0015b6b3e8": 5,  
      "60c72b2f9f1b2c0015b6b3e9": 4,  
      "60c72b2f9f1b2c0015b6b3ea": 5,  
      "60c72b2f9f1b2c0015b6b3eb": 4,  
      "60c72b2f9f1b2c0015b6b3ec": 4, 
      "60c72b2f9f1b2c0015b6b3ed": 5,  
      "60c72b2f9f1b2c0015b6b3ee": 4,  
      "60c72b2f9f1b2c0015b6b3ef": 4,  
      "60c72b2f9f1b2c0015b6b3f0": 4,  
      "60c72b2f9f1b2c0015b6b411": 5,  
      "60c72b2f9f1b2c0015b6b412": 4,  
      "60c72b2f9f1b2c0015b6b413": 5,
      "60c72b2f9f1b2c0015b6b414": 4,  
      "60c72b2f9f1b2c0015b6b415": 5,  
      "60c72b2f9f1b2c0015b6b416": 4,  
      "60c72b2f9f1b2c0015b6b417": 5, 
      "60c72b2f9f1b2c0015b6b418": 4,  
      "60c72b2f9f1b2c0015b6b3f1": 5,  
      "60c72b2f9f1b2c0015b6b3f2": 5,  
      "60c72b2f9f1b2c0015b6b3f3": 4,  
      "60c72b2f9f1b2c0015b6b3f4": 5,  
      "60c72b2f9f1b2c0015b6b3f5": 4, 
      "60c72b2f9f1b2c0015b6b3f6": 4, 
      "60c72b2f9f1b2c0015b6b3f7": 4,  
      "60c72b2f9f1b2c0015b6b3f8": 5,  
      "60c72b2f9f1b2c0015b6b3f9": 5,  
      "60c72b2f9f1b2c0015b6b3fa": 5, 
      "60c72b2f9f1b2c0015b6b3fb": 5,  
      "60c72b2f9f1b2c0015b6b3fc": 4,  
      "60c72b2f9f1b2c0015b6b3fd": 4,  
      "60c72b2f9f1b2c0015b6b3fe": 5,  
      "60c72b2f9f1b2c0015b6b3ff": 4,  
      "60c72b2f9f1b2c0015b6b400": 4,  
      "60c72b2f9f1b2c0015b6b419": 5,  
      "60c72b2f9f1b2c0015b6b420": 5, 
      "60c72b2f9f1b2c0015b6b421": 5,  
      "60c72b2f9f1b2c0015b6b422": 4,  
      "60c72b2f9f1b2c0015b6b423": 4,  
      "60c72b2f9f1b2c0015b6b424": 5,  
      "60c72b2f9f1b2c0015b6b425": 4,  
      "60c72b2f9f1b2c0015b6b426": 4,  
      "60c72b2f9f1b2c0015b6b401": 4,  
      "60c72b2f9f1b2c0015b6b402": 4,  
      "60c72b2f9f1b2c0015b6b403": 4,  
      "60c72b2f9f1b2c0015b6b404": 4,  
      "60c72b2f9f1b2c0015b6b405": 5,  
      "60c72b2f9f1b2c0015b6b406": 4,  
      "60c72b2f9f1b2c0015b6b407": 5,  
      "60c72b2f9f1b2c0015b6b408": 5,  
      "60c72b2f9f1b2c0015b6b427": 5,  
      "60c72b2f9f1b2c0015b6b428": 5, 
      "60c72b2f9f1b2c0015b6b429": 4,  
      "60c72b2f9f1b2c0015b6b430": 4,  
      "60c72b2f9f1b2c0015b6b431": 4, 
      "60c72b2f9f1b2c0015b6b432": 4,  
      "60c72b2f9f1b2c0015b6b433": 4,  
      "60c72b2f9f1b2c0015b6b434": 5   
    };

    console.log("Starting ratings update...\n");
    
    let updatedCount = 0;
    let notFoundCount = 0;

    for (const [productId, rating] of Object.entries(ratingsMap)) {
      const result = await Product.updateOne(
        { _id: productId },
        { $set: { rating: rating } },
        { strict: false } 
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