const Recipe = require("../models/recipeSchema");

// Create seeder recipes
const recipes = [
  {
    name: "Chocolate Chip Cookies",
    ingredients: ["flour", "sugar", "butter", "chocolate chips"],
  },
  {
    name: "Pancakes",
    ingredients: ["flour", "sugar", "butter", "milk", "eggs"],
  },
  {
    name: "Spaghetti Bolognese",
    ingredients: [
      "spaghetti",
      "ground beef",
      "tomato sauce",
      "onion",
      "garlic",
    ],
  },
  {
    name: "Chicken Alfredo",
    ingredients: [
      "fettuccine",
      "chicken",
      "heavy cream",
      "butter",
      "parmesan cheese",
    ],
  },
];

// Check if pre-existing and then save to MongoDB
for (const recipeData of recipes) {
  const exists = await Recipe.findOne({ name: recipeData.name });
  if (!exists) {
    const recipe = new Recipe(recipeData);
    await recipe.save();
    console.log(`Seeder recipe saved: ${recipeData.name}`);
  } else {
    console.log(`Seeder recipe already exists: ${recipeData.name}`);
  }
}
