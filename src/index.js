// import "core-js/stable";
// import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import pg from "pg";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const express = require("express");
// const { Pool } = require(pg);
// const app = express();
// app.use(express.json());

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "Recipe-Book",
//   password: "bigtiger26",
//   port: 5432,
// });

// app.post("/api/recipes", async (req, res) => {
//   const { name, picture, ingredients } = req.body;

//   try {
//     const result = await pool.query(
//       "INSERT INTO recipes (name, picture, ingredients) VALUES ($1, $2, $3) RETURNING *",
//       [name, picture, ingredients]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
