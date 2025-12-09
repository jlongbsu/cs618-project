import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { Header } from "../components/Header.jsx";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/recipes.js";
import { useState } from "react";

// const recipes = [
//   {
//     _id: "1",
//     title: "Full-Stack React Pizza",
//     ingredients: [
//       "2 cups flour",
//       "1 cup water",
//       "1 tbsp yeast",
//       "Tomato sauce",
//       "Mozzarella cheese",
//     ],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/500px-Pizza-3007395.jpg",
//     author: "Daniel Bugl",
//     tags: ["Italian", "Dinner"],
//   },
//   {
//     _id: "2",
//     title: "Hello React Salad",
//     ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive oil", "Salt"],
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad_platter.jpg/500px-Salad_platter.jpg",
//     author: "Jane Doe",
//     tags: ["Healthy", "Lunch"],
//   },
// ];

export function RecipeSharer() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const recipesQuery = useQuery({
    queryKey: ["recipes", { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  });
  const recipes = recipesQuery.data ?? [];

  return (
    <div style={{ padding: 8 }}>
      <Header />
      <br />
      <hr />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={["createdAt", "updatedAt", "likeCount"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  );
}
