import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import cors from "cors";

// Page Imports
import Home from "./views/home";
import Add from "./views/add";
import RecipeBook from "./views/recipes";
import Error404 from "./views/error404";
import EditRecipe from "./views/editRecipe";

const express = require("express");
const connectDB = require("./controllers/db");

// Establish connection to MongoDB
connectDB();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/recipes/add" element={<Add />} />
        <Route path="/recipes" element={<RecipeBook />} />
        <Route path="/recipes/:id/edit" element={<EditRecipe />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

export default App;
