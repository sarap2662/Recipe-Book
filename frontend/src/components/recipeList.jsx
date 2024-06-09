import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recipe = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.recipe.name}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.recipe.picture}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.recipe.ingredients}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.recipe._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.recipe._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

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
    await fetch(`http://localhost:5000/recipes/${id}`, {
      method: "DELETE",
    });
    const newRecipes = recipes.filter((el) => el._id !== id);
    setRecipes(newRecipes);
  }
  // Map out all recipes from the database
  function recipeList() {
    return recipes.map((recipe) => {
      return (
        <Recipe
          recipe={recipe}
          deleteRecipe={() => deleteRecipe(recipe._id)}
          key={recipe._id}
        />
      );
    });
  }

  // Will show individual recipes
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Recipes</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkout])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkout])]:pr-0">
                  Picture
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkout])]:pr-0">
                  Ingredients
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {recipeList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
