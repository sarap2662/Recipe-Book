import React, { useState } from "react";
import "./pages.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// import axios from "axios";

function Add() {
  const [ingredients, setIngredients] = useState([""]);

  const handleAddIngredient = (index, event) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
    // Will create and update the ingredients array with the values from the input fields
  };

  const handleAddClick = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveClick = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // will hold the value of the ingredients array to send to the backend
  };

  // const recipe = {
  //   name: document.getElementById("formBasicName").value,
  //   picture: document.getElementById("formBasicPicture").value,
  //   ingredients: ingredients,
  //   // Will create a recipe object with the values from the input fields
  // };

  // axios
  //   .post("http://localhost:3001/recipes", recipe)
  //   .then((res) => console.log(res.data))
  //   .catch((error) => console.error(error));
  // // Will send the recipe object to the backend to be stored in the database

  return (
    <>
      <div>
        <h1 className="intro">Add your favorite Recipes!</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBasicName">
            <Form.Label htmlFor="name">Recipe Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group as={Col} controlId="formBasicPicture">
            <Form.Label htmlFor="picture">Picture</Form.Label>
            <Form.Control type="url" placeholder="Enter picture URL" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicIngredients">
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(event) => handleAddIngredient(index, event)}
              />
              <Button onClick={handleAddClick}>+</Button>
              {ingredients.length > 1 && (
                <Button onClick={() => handleRemoveClick(index)}>-</Button>
              )}
            </div>
          ))}
        </Form.Group>
        <div className="button-container">
          <Button
            className="submit"
            as="input"
            type="submit"
            value="Add Recipe"
            size="lg"
          />{" "}
        </div>
      </Form>
    </>
  );
}

export default Add;
