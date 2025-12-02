import { initDatabase } from "./db/init.js";
import { Recipe } from "./db/models/recipe.js"; // updated model

import dotenv from "dotenv";
dotenv.config();
await initDatabase();

// Create a new recipe
const recipe = new Recipe({
  title: "Hello React Salad",
  author: "Jane Doe",
  ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive oil", "Salt"],
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad_platter.jpg/500px-Salad_platter.jpg",
  tags: ["Healthy", "Lunch"],
});

// Save it to the database
await recipe.save();

// Retrieve all recipes and log them
const recipes = await Recipe.find();
console.log(recipes);
