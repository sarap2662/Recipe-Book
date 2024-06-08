const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/recipe-book", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create two seeder recipes
    const recipe1 = new Recipe({
      name: "Chocolate Chip Cookies",
      ingredients: ["flour", "sugar", "butter", "chocolate chips"],
    });

    const recipe2 = new Recipe({
      name: "Spaghetti Bolognese",
      ingredients: [
        "spaghetti",
        "ground beef",
        "tomato sauce",
        "onion",
        "garlic",
      ],
    });

    // Save the seeder recipes to MongoDB
    Promise.all([recipe1.save(), recipe2.save()])
      .then(() => {
        console.log("Seeder recipes saved successfully");
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error("Error saving seeder recipes:", error);
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
