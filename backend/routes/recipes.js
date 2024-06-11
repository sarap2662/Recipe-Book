import express from "express";
// Will assist with database connection
import db from "../db/connection.js";
// Will assist with ObjectId conversion
import { ObjectId } from "mongodb";

const router = express.Router(); // Middleware to handle requests

// Get a list of all recipes stored in the database
router.get("/", async (req, res) => {
  let collection = await db.collection("recipes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a specific recipe by its id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("recipes");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Recipe not found").status(404);
  else res.send(result).status(200);
});

// Add a new recipe to the database
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      picture: req.body.picture,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
    };
    let collection = await db.collection("recipes");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding recipe");
  }
});

// Update a recipe in the database
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        picture: req.body.picture,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      },
    };

    let collection = await db.collection("recipes");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating recipe");
  }
});

// Delete a recipe from the database
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("recipes");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting recipe");
  }
});

// Export the router for use in the app
export default router;
