// Modules and Globals
require("dotenv").config();

const methodOverride = require("method-override");
const path = require("path");

// Express Configuration
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Controllers & Routes
app.use("/recipes", require("./controllers/recipes"));

app.get("/", (_, res) => {
  res.render("home");
});

app.get("*", (_, res) => {
  res.render("error");
});
