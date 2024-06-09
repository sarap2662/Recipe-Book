const express = require("express");
const cors = require("cors");
const recipes = require("./routes/recipeRoutes.js");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/recipes", recipes);

// Start express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
