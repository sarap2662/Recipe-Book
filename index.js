// Modules and Globals
require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");

// Express Configuration
app.set("pages", __dirname + "/pages");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Controllers & Routes
app.use("/recipes", require("./controllers/recipes"));

// Listening for connections
app.listen(process.env.PORT);
