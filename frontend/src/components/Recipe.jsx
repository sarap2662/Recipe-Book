import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../views/pages.css";
import { Form, Col, Row, Button, InputGroup, Container } from "react-bootstrap";

export default function Recipe() {
  const [form, setForm] = useState({
    name: "", // default empty string
    picture: "https://via.placeholder.com/150x122", // default placeholder image if none provided
    ingredient: "",
    instruction: "",
    ingredients: [], // initialized as an empty array
    instructions: [], // initialized as an empty array
  });
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentInstruction, setCurrentInstruction] = useState("");
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

  // // Handler for input field changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

  const handleIngredientChange = (e) => {
    setCurrentIngredient(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setCurrentInstruction(e.target.value);
  };

  // const addItemToArray = (arrayName, value) => {
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [arrayName]: [...prevForm[arrayName], form[value]],
  //     [value]: "", // Clear the input field after adding
  //   }));
  // };

  // Handler for adding ingredients
  const updateIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setForm((prevForm) => ({
        ...prevForm,
        ingredients: [...prevForm.ingredients, currentIngredient.trim()],
      }));
      setCurrentIngredient("");
    }
  };

  // Handler for adding ingredients
  const updateInstruction = () => {
    if (currentInstruction.trim() !== "") {
      setForm((prevForm) => ({
        ...prevForm,
        instructions: [...prevForm.instructions, currentInstruction.trim()],
      }));
      setCurrentInstruction("");
    }
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

  // Add an item to the ingredients or instructions array
  const addItem = (arrayName) => {
    if (arrayName === "ingredients") {
      setIngredients([...ingredients, ""]);
    } else {
      setInstructions([...instructions, ""]);
    }
  };

  // // Update the input fields for the ingredients or instructions array
  // const updateItem = (arrayName, index, value) => {
  //   if (!value.trim() || index < 0) return; // Prevent empty strings from being added
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [arrayName]: prevForm[arrayName].map((item, i) =>
  //       i === index ? value : item
  //     ),
  //   }));
  // };

  // Remove an item from the ingredients or instructions array
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
      ingredients: form.ingredient
        ? [...form.ingredients, form.ingredient]
        : [...form.ingredients],
      instructions: form.instruction
        ? [...form.instructions, form.instruction]
        : [...form.instructions],
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
                {ingredients.map((index) => (
                  <div key={index}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={currentIngredient}
                        onChange={handleIngredientChange}
                        placeholder="Add ingredient"
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
                      <Button onClick={updateIngredient}>+</Button>
                    </div>
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="instructions">Instructions</Form.Label>
                {instructions.map((index) => (
                  <div key={index}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={currentInstruction}
                        onChange={handleInstructionChange}
                        placeholder="Add a step"
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
                      <Button onClick={updateInstruction}>+</Button>
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
