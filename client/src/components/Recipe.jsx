import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Recipe() {
  const [form, setForm] = useState({
    name: "",
    diet: "",
    restriction: "",
    ingredients: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
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

  //   useEffect(() => {
  //     async function fetchData() {
  //       const id = params.id?.toString() || undefined;
  //       if (!id) return;
  //       const response = await fetch(
  //         `http://localhost:5000/recipes/${params.id.toString()}`
  //       );
  //       if (!response.ok) {
  //         const message = `An error has occured: ${response.statusText}`;
  //         console.error(message);
  //         return;
  //       }
  //       setForm(recipe);
  //     }
  //     fetchData();
  //     return;
  //   }, [params.id, navigate]);

  // Will update the state variables
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // Will submit the form to the database
  async function onSubmit(e) {
    e.preventDefault();
    const food = { ...form };
    try {
      //       // if id is present, will set URL to /recipes/:id, elsewise will set URL to /recipes
      //       const response = await fetch(
      //         `http://localhost:5000/recipes${
      //           params.id ? "/recipes/" + params.id : ""
      //         }`,
      //         {
      //           // if the id is present, will PATCH to /recipes/:id, elsewise will POST to /recipes
      //           method: `{params.id ? "PATCH" : "POST"}`,
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify(food),
      //         }
      //       );

      //       if (!response.ok) {
      //         throw new Error(`HTTP error! status: ${response.status}`);
      //       }
      //     } catch (error) {
      //       console.error("A problem occurred with your fetch operation: ", error);
      //     } finally {
      //       setForm({ name: "", diet: "", restriction: "", ingredients: "" });
      //       navigate("/recipes");
      //     }
      //   }
      let response;
      if (isNew) {
        // if adding a new recipe will POST to /recipes
        response = await fetch("http://localhost:5000/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(food),
        });
      } else {
        // if updating a recipe will PATCH to /recipes/:id
        response = await fetch(`http://localhost:5000/recipes/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(food),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred with your fetch operation: ", error);
    } finally {
      setForm({ name: "", diet: "", restriction: "", ingredients: "" });
      navigate("/");
    }
  }

  // Will display form that takes user input
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Recipe</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/20 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Recipe Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Leave some information about the recipe.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Recipe Name"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="diet"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Diet
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="diet"
                    id="diet"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="List the diet type of the recipe"
                    value={form.diet}
                    onChange={(e) => updateForm({ diet: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="food-types">Food Types</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="vegetarian"
                      name="foodOptions"
                      type="radio"
                      value="Vegetarian"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.restriction === "Vegetarian"}
                      onChange={(e) =>
                        updateForm({ restriction: e.target.value })
                      }
                    />
                    <label
                      htmlFor="vegetarian"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Vegetarian
                    </label>
                    <input
                      id="vegan"
                      name="foodOptions"
                      type="radio"
                      value="Vegan"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.restriction === "Vegan"}
                      onChange={(e) =>
                        updateForm({ restriction: e.target.value })
                      }
                    />
                    <label
                      htmlFor="vegan"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Vegan
                    </label>
                    <input
                      id="pescatarian"
                      name="foodOptions"
                      type="radio"
                      value="Pescatarian"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.restriction === "Pescatarian"}
                      onChange={(e) =>
                        updateForm({ restriction: e.target.value })
                      }
                    />
                    <label
                      htmlFor="pescatarian"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Pescatarian
                    </label>
                    <input
                      id="none"
                      name="foodOptions"
                      type="radio"
                      value="None"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.restriction === "None"}
                      onChange={(e) =>
                        updateForm({ restriction: e.target.value })
                      }
                    />
                    <label
                      htmlFor="none"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      No Restrictions
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Ingredients
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    name="ingredients"
                    id="ingredients"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Ingredients"
                    value={form.ingredients}
                    onChange={(e) =>
                      updateForm({ ingredients: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Recipe"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
