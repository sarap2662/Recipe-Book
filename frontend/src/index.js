import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/recipes",
    element: <App />,
    children: [
      {
        path: "/recipes",
        element: <RecipeBook />,
      },
    ],
  },
  {
    path: "/recipes/add",
    element: <App />,
    children: [
      {
        path: "/recipes/add",
        element: <Add />,
      },
    ],
  },
  {
    path: "/recipes/:id/edit",
    element: <App />,
    children: [
      {
        path: "/recipes/:id/edit",
        element: <EditRecipe />,
      },
    ],
  },
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
