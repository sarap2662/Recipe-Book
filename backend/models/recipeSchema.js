import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
    default: "https://via.placeholder.com/150x122",
  },
  ingredients: [
    {
      type: [String],
      required: true,
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now, // Default value is the current date
  },
});

recipeSchema.index({ name: 1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
