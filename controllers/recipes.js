const router = require("express").Router();
const db = require("../models");

// GET /recipes
router.get("/", (req, res) => {
  db.Recipe.find()
    .then((recipes) => {
      res.render("recipes/index", { recipes });
    })
    .catch((err) => {
      console.log(err);
      res.render("Error");
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST /recipes");
});

module.exports = router;
