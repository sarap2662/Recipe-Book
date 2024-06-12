import cors from "cors";
import express from "express";
import recipes from "./routes/recipes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/recipes", recipes);
// find specific recipe by id /recipes/:id
// find all recipes /recipes

// Start express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
