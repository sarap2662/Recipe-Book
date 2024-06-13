import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../views/pages.css";
import { Form, Col, Row, Button, InputGroup, Container } from "react-bootstrap";

export default function Recipe() {
  const [form, setForm] = useState({
    name: "", // default empty string
    picture: "https://via.placeholder.com/150x122", // default placeholder image if none provided
    ingredients: [], // initialized as an empty array
    instructions: [], // initialized as an empty array
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  // const [newIngredient, setNewIngredient] = useState("");
  // const [newInstruction, setNewInstruction] = useState("");
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

  const updateForm = (updates) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...updates,
    }));
  };

  const updateFormArray = (arrayName, operation, index, value) => {
    setForm((prevForm) => {
      // Create a copy of the ingredients array to avoid direct mutation
      let newArray = [...prevForm[arrayName]];

      switch (operation) {
        case "add":
          // Add item to the array
          addItem(arrayName);
          break;
        case "remove":
          // Remove item
          removeItem(index, arrayName);
          break;
        case "update":
          // Update item at specified index with newItem
          newArray[index] = value;
          break;
        default:
          // Optionally handle unknown operations
          console.warn("Unknown operation:", operation);
      }

      // Return the updated form with modified array
      return {
        ...prevForm,
        [arrayName]: newArray, // Update the array in the form
      };
    });
  };

  // Add an item to the specified array
  const addNewItem = (arrayName, item) => {
    if (!item.trim()) return; // Prevent adding empty items
    setForm((prevForm) => ({
      ...prevForm,
      [arrayName]: [...prevForm[arrayName], item],
    }));
  };

  const removeItem = (index, arrayName) => {
    // Determine which array to update
    const arrayToUpdate =
      arrayName === "ingredients" ? ingredients : instructions;
    const formArrayToUpdate =
      arrayName === "ingredients" ? form.ingredients : form.instructions;

    // Remove item from local state
    const newLocalArray = [...arrayToUpdate];
    newLocalArray.splice(index, 1);
    if (arrayName === "ingredients") {
      setIngredients(newLocalArray);
    } else {
      setInstructions(newLocalArray);
    }

    // Remove item from form state
    const newFormArray = formArrayToUpdate.filter((_, i) => i !== index);
    updateForm({ [arrayName]: newFormArray });
  };

  const addItem = (arrayName) => {
    if (arrayName === "ingredients") {
      setIngredients([...ingredients, ""]);
    } else {
      setInstructions([...instructions, ""]);
    }
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
    const food = {
      ...form,
      ingredients: [...ingredients],
      instructions: [...instructions],
    };
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
        ingredients: [],
        instructions: [],
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
          <Container>
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
                        onChange={(e) => {
                          // Update the ingredient at the specified index
                          updateFormArray(
                            "ingredients",
                            "update",
                            index,
                            e.target.value
                          );
                        }}
                      />
                      {ingredients.length > 1 && (
                        <Button
                          onClick={() => {
                            // Remove ingredient at specified index
                            updateFormArray("ingredients", "remove", null);
                          }}
                          id="button-addon2"
                        >
                          Remove
                        </Button>
                      )}
                    </InputGroup>
                    <div className="input-buttons">
                      <Button
                        onClick={() => {
                          updateFormArray("ingredients", "add", null);
                        }}
                      >
                        +
                      </Button>
                    </div>
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
                        onChange={(e) => {
                          // Update the instruction at the specified index
                          updateFormArray(
                            "instructions",
                            "update",
                            index,
                            e.target.value
                          );
                        }}
                      />
                      {instructions.length > 1 && (
                        <Button
                          onClick={() => {
                            // Remove instruction at specified index
                            updateFormArray("instructions", "remove", null);
                          }}
                          id="button-addon2"
                        >
                          Remove
                        </Button>
                      )}
                    </InputGroup>
                    <div className="input-buttons">
                      <Button
                        onClick={() => {
                          updateFormArray("instructions", "add", null);
                        }}
                      >
                        +
                      </Button>
                    </div>
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
          </Container>
        </div>
      </div>
    </>
  );
}
