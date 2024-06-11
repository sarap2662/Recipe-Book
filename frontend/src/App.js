import Navbar from "./components/navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import Home from "./components/home.jsx";
import Recipe from "./components/Recipe.jsx";
import RecipeCards from "./components/recipeList.jsx";
import Error404 from "./components/error404.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeCards />} />
        <Route path="/edit/:id" element={<Recipe />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Recipe />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
