import React, { useState, useEffect } from "react";
import "../views/pages.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function RecipeCards() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch all recipes from the database
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`http://localhost:5000/`);
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        console.error(message);
        return;
      }
      const recipes = await response.json();
      setRecipes(recipes);
    }
    getRecipes();
    return;
  }, [recipes.length]);

  // Delete a recipe from the database
  async function deleteRecipe(id) {
    await fetch(`http://localhost:5000/recipes/${id}`, {
      method: "DELETE",
    });
    const newRecipes = recipes.filter((el) => el._id !== id);
    setRecipes(newRecipes);
  }

  // Map out all recipes from the database
  // function recipeMap() {
  //   return recipes.map((recipe) => {
  //     return (
  //       <Recipe
  //         recipe={recipe}
  //         deleteRecipe={() => deleteRecipe(recipe._id)}
  //         key={recipe._id}
  //       />
  //     );
  //   });
  // }

  return (
    <>
      <div className="fullPage">
        <div>
          <h1 className="intro">Turn the pages of your Recipe Book!</h1>
        </div>

        <div className="recipeContainer">
          <Row xs={1} md={2} className="g-4">
            {recipes.map((recipe, idx) => (
              <Col key={idx}>
                <Card style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      recipe.picture || "https://via.placeholder.com/150x122"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/edit/${recipe.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteRecipe(recipe.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default RecipeCards;
