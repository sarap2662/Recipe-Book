import React from "react";
import "./pages.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const Add = () => {
  return (
    <div>
      <h1 className="intro">Add new recipes here</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label htmlFor="name">Recipe Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicIngredients">
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
          <Form.Control type="text" placeholder="List all ingredients" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPicture">
          <Form.Label htmlFor="picture">Picture</Form.Label>
          <Form.Control type="url" placeholder="Enter picture URL" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCookTime">
          <Form.Label htmlFor="cookTime">Cook Time</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Button as="input" type="submit" value="Add Recipe" />{" "}
      </Form>
    </div>
  );
};

export default Add;
