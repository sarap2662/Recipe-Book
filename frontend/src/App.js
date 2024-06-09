import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Page Imports
import Home from "./views/home";
import Add from "./views/add";
import RecipeBook from "./views/recipes";
import Error404 from "./views/error404";
import EditRecipe from "./views/editRecipe";

const connectDB = require("../../backend/controllers/db");

// Establish connection to MongoDB
connectDB();

require("dotenv").config();

function App() {
  return;
  // <Router>
  //   <Navbar />
  //   <Routes>
  //     <Route exact path="/" element={<Home />} />
  //     <Route path="/recipes/add" element={<Add />} />
  //     <Route path="/recipes" element={<RecipeBook />} />
  //     <Route path="/recipes/:id/edit" element={<EditRecipe />} />
  //     <Route path="*" element={<Error404 />} />
  //   </Routes>
  // </Router>
}

export default App;
