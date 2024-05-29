import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Add from "./pages/add";
import RecipeBook from "./pages/recipes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/recipes" element={<RecipeBook />} />
      </Routes>
    </Router>
  );
}

export default App;
