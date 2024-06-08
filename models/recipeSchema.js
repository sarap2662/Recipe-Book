const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, default: "https://via.placeholder.com/150x122" },
  ingredients: { type: [String], required: true },
});

module.exports = mongoose.model("Recipe", recipeSchema);
