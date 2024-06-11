import React, { useState, useEffect } from "react";
import "../views/pages.css";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Recipe = (props) => {
  const { recipe, deleteRecipe } = props;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={props.recipe.picture || "https://via.placeholder.com/150x122"}
      />
      <Card.Body>
        <Card.Title>{props.recipe.name}</Card.Title>
        <Link to={`/edit/${props.recipe._id}`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={() => deleteRecipe(props.recipe._id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default function RecipeCards() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch all recipes from the database
  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`http://localhost:5000/recipes/`);
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
    const response = await fetch(`http://localhost:5000/recipes/${id}`, {
      method: "DELETE",
    });

    // Check for successful deletion
    if (response.ok) {
      // Remove the recipe from the state
      const newRecipes = recipes.filter((recipe) => recipe._id !== id);
      setRecipes(newRecipes);
    } else {
      // Handle error/ display message to user
      const message = `Failed to delete recipe: ${response.statusText}`;
      console.error(message);
    }
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
          <Container>
            <Row>
              {recipes.map((recipe, idx) => (
                <Col sm={6} md={4} lg={3} key={recipe._id}>
                  <Recipe
                    recipe={recipe}
                    onEdit={() => navigate(`/edit/${recipe._id}`)}
                    deleteRecipe={deleteRecipe}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
