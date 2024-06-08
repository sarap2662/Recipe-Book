import Recipe from "../models/recipe";

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../models");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Show all recipes
app.get("/recipes", (req, res) => {
  db.Recipe.find()
    .then((recipes) => {
      res.render("recipes/index", { recipes });
    })
    .catch((err) => {
      console.log(err);
      res.render("Error");
    });
});

// Show a specific recipe
app.get("/:id", (req, res) => {
  db.Recipe.findById(req.params.id)
    .then((recipe) => {
      res.render("recipes/show", { recipe });
    })
    .catch((err) => {
      console.log(err);
      res.render("Error");
    });
});

// Create a new recipe
app.post("/add", async (req, res) => {
  try {
    const { name, picture, ingredients } = req.body;
    const newRecipe = new Recipe({ name, picture, ingredients });
    await newRecipe.save();
    res.status(201).json(newRecipe, "Recipe added successfully!");
  } catch (error) {
    console.error("Error adding recipe: ", error);
    res.status(500).json({ error: "Error adding recipe" });
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
    res.status(200).json(updatedRecipe, "Recipe updated successfully!");
  } catch (error) {
    console.error("Error updating recipe: ", error);
    res.status(500).json({ error: "Error updating recipe" });
  }
});
