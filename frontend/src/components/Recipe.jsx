import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../views/pages.css";
import { Form, Col, Row, Button, InputGroup } from "react-bootstrap";

export default function Recipe() {
  const [form, setForm] = useState({
    name: "", // default empty string
    picture: "https://via.placeholder.com/150x122", // default placeholder image if none provided
    ingredients: [""], // initialized as an array with an empty string
    instructions: [""], // initialized as an array with an empty string
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  // const [currentIngredient, setCurrentIngredient] = useState("");
  // const [currentInstruction, setCurrentInstruction] = useState("");
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
  // function updateForm(value) {
  //   return setForm((prev) => {
  //     return { ...prev, ...value };
  //   });
  // }

  const updateForm = (updates) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...updates,
    }));
  };

  // Will create and update the ingredients array with the values from the input fields
  const handleAddIngredient = (index, event) => {
    const values = [...ingredients];
    values[index] = event.target.value;
    setIngredients(values);
  };

  const handleAddInstruction = (index, event) => {
    const values = [...instructions];
    values[index] = event.target.value;
    setInstructions(values);
  };

  const handleAddIngredientClick = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleAddInstructionClick = () => {
    setInstructions([...instructions, ""]);
  };

  const addIngredient = () => {
    // Add current ingredient to the array
    const newIngredients = [...form.ingredients];
    newIngredients.push("");
    updateForm({ ...form, ingredients: newIngredients });
  };

  const addInstruction = () => {
    // Add current instruction to the array
    const newInstructions = [...form.instructions];
    newInstructions.push("");
    updateForm({ ...form, instructions: newInstructions });
  };

  const handleRemoveIngredientClick = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleRemoveInstructionClick = (index) => {
    const values = [...instructions];
    values.splice(index, 1);
    setInstructions(values);
  };

  function handlePictureClick() {
    if (form.picture === "https://via.placeholder.com/150x122") {
      updateForm({ picture: "" }); // Clear placeholder text
    }
  }

  function handlePictureBlur() {
    if (form.picture === "") {
      updateForm({ picture: "https://via.placeholder.com/150x122" }); // Reset placeholder text
    }
  }

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
          body: JSON.stringify(food, { ingredients, instructions }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }

      // Reset form and navigate only after successful fetch
      setForm({
        name: "",
        picture: "https://via.placeholder.com/150x122",
        ingredients: [""],
        instructions: [""],
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe: ", error);
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
              <Form.Group as={Col}>
                <Form.Label htmlFor="name">Recipe Name</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor="picture">Picture URL</Form.Label>
                <Form.Control
                  type="url"
                  value={form.picture}
                  onClick={handlePictureClick}
                  onChange={(e) => updateForm({ picture: e.target.value })}
                  onBlur={handlePictureBlur}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
              {ingredients.map((ingredient, index) => (
                <div key={index}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleAddIngredient(index, e)}
                    />
                    <Button onClick={() => addIngredient()} id="button-addon2">
                      Add
                    </Button>
                  </InputGroup>
                </div>
              ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="instructions">Instructions</Form.Label>
              {instructions.map((instruction, index) => (
                <div key={index}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={instruction}
                      onChange={(e) => handleAddInstruction(index, e)}
                    />
                    <Button onClick={() => addInstruction()} id="button-addon2">
                      Add
                    </Button>
                  </InputGroup>
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
