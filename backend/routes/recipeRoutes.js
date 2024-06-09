import express from "express";
import db from "../db/dbConnection"; // Will assist with database connection
import { ObjectId } from "mongodb"; // Will help convert id from string to ObjectId

const router = express.Router(); // Middleware to handle requests

// Get a list of all recipes stored in the database
router.get("/recipes", async (req, res) => {
  let collection = db.collection("recipes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a specific recipe by its id
router.get("/recipes/:id", async (req, res) => {
  let collection = db.collection("recipes");
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Recipe not found").status(404);
  else res.send(result).status(200);
});

// Add a new recipe to the database
router.post("/recipes/add", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      picture: req.body.picture,
      ingredients: req.body.ingredients,
    };
    let collection = db.collection("recipes");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding recipe");
  }
});

// Update a recipe in the database
router.patch("/recipes/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        picture: req.body.picture,
        ingredients: req.body.ingredients,
      },
    };

    let collection = db.collection("recipes");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating recipe");
  }
});

// Delete a recipe from the database
router.delete("/recipes/:id", async (req, res) => {
  try {
    const query = { _id: ObjectId(req.params.id) };

    const collection = db.collection("recipes");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting recipe");
  }
});

export default router; // Export the router for use in the app
