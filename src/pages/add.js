import React from "react";
import "./pages.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function Add() {
  return (
    <>
      <div>
        <h1 className="intro">Add a page into your Recipe Book!</h1>
      </div>
      <Form>
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
          <Form.Control as="textarea" placeholder="List all ingredients" />
        </Form.Group>
        <Button as="input" type="submit" value="Add Recipe" />{" "}
      </Form>
    </>
  );
}

export default Add;
