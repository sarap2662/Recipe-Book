const router = require("express").Router();
const db = require("../models");

// GET /recipes
router.get("/", (req, res) => {
  let recipes = [
    {
      name: "Chicken Parmesan",
      picture:
        "https://www.themealdb.com/images/media/meals/vvpprx1511179733.jpg",
      ingredients: [
        "Chicken",
        "Tomato Sauce",
        "Mozzarella Cheese",
        "Parmesan Cheese",
      ],
    },
    {
      name: "Pasta Carbonara",
      picture:
        "https://www.themealdb.com/images/media/meals/2dajc01574263431.jpg",
      ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan Cheese"],
    },
    {
      name: "Chicken Alfredo",
      picture:
        "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
      ingredients: ["Chicken", "Fettuccine", "Heavy Cream", "Parmesan Cheese"],
    },
    {
      name: "Chicken Marsala",
      picture:
        "https://www.themealdb.com/images/media/meals/xpqwuq1487335897.jpg",
      ingredients: ["Chicken", "Marsala Wine", "Mushrooms", "Butter"],
    },
    {
      name: "Chicken Piccata",
      picture:
        "https://www.themealdb.com/images/media/meals/xptn0g1565983684.jpg",
      ingredients: ["Chicken", "Lemon", "Capers", "Butter"],
    },
  ];
  res.render("recipes/index", { recipes });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send("POST /recipes");
});

module.exports = router;
