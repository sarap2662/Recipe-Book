import React, { useState, useEffect } from "react";

const EditRecipe = ({ match }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    picture: "",
    ingredients: [""],
  });

  const { id } = match.params;

  useEffect(() => {
    //Fetch the recipe with the id from the backend
    const fetchRecipe = async () => {
      const response = await fetch(`/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Send the updated recipe to the backend
    const response = await fetch(`/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      //Redirect to the recipe book page
      console.log("Recipe updated successfully!");
    }
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </label>
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
