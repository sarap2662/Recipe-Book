import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // Page Imports
// import Home from "./views/home";
// import Add from "./views/add";
// import RecipeBook from "./views/recipes";
// import Error404 from "./views/error404";
// import EditRecipe from "./views/editRecipe";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//     ],
//   },
//   {
//     path: "/recipes",
//     element: <App />,
//     children: [
//       {
//         path: "/recipes",
//         element: <RecipeBook />,
//       },
//     ],
//   },
//   {
//     path: "/recipes/add",
//     element: <App />,
//     children: [
//       {
//         path: "/recipes/add",
//         element: <Add />,
//       },
//     ],
//   },
//   {
//     path: "/recipes/:id/edit",
//     element: <App />,
//     children: [
//       {
//         path: "/recipes/:id/edit",
//         element: <EditRecipe />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <App />,
//     children: [
//       {
//         path: "*",
//         element: <Error404 />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
