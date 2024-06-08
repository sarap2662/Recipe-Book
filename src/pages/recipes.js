import React from "react";
import "./pages.css";
import Buttton from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const RecipeBook = (data) => {
  //   let recipesFormatted = data.recipes.map((recipe) => {
  //     return (
  //       <Col key={recipe.name}>
  //         <Card style={{ width: "20rem" }}>
  //           <Card.Img variant="top" src={recipe.picture} />
  //           <Card.Body>
  //             <Card.Title>{recipe.name}</Card.Title>
  //             <Buttton variant="primary">View Recipe</Buttton>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     );
  //   });
  // };
  return (
    <>
      <div className="fullPage">
        <div>
          <h1 className="intro">Turn the pages of your Recipe Book!</h1>
        </div>
        <div className="recipeContainer">
          <div className="recipeCards">
            <Row xs={1} md={2} className="g-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                  <Card style={{ width: "20rem" }}>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/150x122"
                    />
                    <Card.Body>
                      <Card.Title>Recipe Name</Card.Title>
                      <Buttton variant="primary">View Recipe</Buttton>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeBook;
