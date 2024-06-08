const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("../models/recipeSchema");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error finding recipes" });
  }
});

// Show all recipes
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.json({ recipes });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding recipes" });
    });
});

// Show a specific recipe
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.json({ recipe });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding recipe" });
    });
});

// Create a new recipe
app.post("/recipes/add", async (req, res) => {
  try {
    const { name, picture, ingredients } = req.body;
    const newRecipe = new Recipe({ name, picture, ingredients });
    await newRecipe.save();
    res.status(201).json({ newRecipe, message: "Recipe added successfully!" });
  } catch (error) {
    console.error("Error adding recipe: ", error);
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// Update a recipe
app.put("/recipe/:id", async (req, res) => {
  try {
    const { name, picture, ingredients } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
      name,
      picture,
      ingredients,
    });
    res
      .status(200)
      .json({ updatedRecipe, message: "Recipe updated successfully!" });
  } catch (error) {
    console.error("Error updating recipe: ", error);
    res.status(500).json({ message: "Error updating recipe" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
