import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../views/pages.css";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function Recipe() {
  const [form, setForm] = useState({
    name: "",
    diet: "",
    restriction: "",
    ingredients: [],
  });
  const [ingredients, setIngredients] = useState([""]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(
        `http://localhost:5000/recipes/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        console.error(message);
        return;
      }
      const recipe = await response.json();
      if (!recipe) {
        console.warn(`Recipe with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(recipe);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // Will update the state variables
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Will create and update the ingredients array with the values from the input fields
  const handleAddIngredient = (index, event) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
  };

  const handleAddClick = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveClick = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // will hold the value of the ingredients array to send to the backend
    const food = { ...form };
    try {
      // if id is present, will set URL to /recipes/:id. elsewise URL will be /recipes
      const response = await fetch(
        `http://localhost:5000/recipes${params.id ? "/" + params.id : ""}`,
        {
          // if id is present, will PATCH. elsewise will POST
          method: `${params.id ? "PATCH" : "POST"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(food),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occured with your fetch operation:", error);
    } finally {
      setForm({ name: "", diet: "", restriction: "", ingredients: [] });
      navigate("/");
    }
  };

  return (
    <>
      <div className="fullPage">
        <div>
          <h1 className="intro">Add/Edit your favorite Recipes!</h1>
        </div>
        <div className="formContainer">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBasicName">
                <Form.Label htmlFor="name">Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicDiet">
                <Form.Label htmlFor="diet">Diet</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="List the diet type of the recipe"
                  value={form.diet}
                  onChange={(e) => updateForm(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group>
              <fieldset>
                <legend className="food-types">Food Types</legend>
                <Form.Label htmlFor="formBasicRestriction">
                  Dietary Restrictions
                </Form.Label>
                <div className="mb-3">
                  <Form.Check
                    inline
                    name="foodOptions"
                    type="radio"
                    id="vegetarian"
                    value="Vegetarian"
                    checked={form.restriction === "Vegetarian"}
                    onChange={(e) => updateForm(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="foodOptions"
                    type="radio"
                    id="vegan"
                    value="Vegan"
                    checked={form.restriction === "Vegan"}
                    onChange={(e) => updateForm(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="foodOptions"
                    type="radio"
                    id="pescatarian"
                    value="Pescatarian"
                    checked={form.restriction === "Pescatarian"}
                    onChange={(e) => updateForm(e.target.value)}
                  />
                  <Form.Check
                    inline
                    name="foodOptions"
                    type="radio"
                    id="none"
                    value="None"
                    checked={form.restriction === "None"}
                    onChange={(e) => updateForm(e.target.value)}
                  />
                </div>
              </fieldset>
            </Form.Group>
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
        </div>
      </div>
    </>
  );
}
