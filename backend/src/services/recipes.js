import { Recipe } from "../db/models/recipe.js";
import { User } from "../db/models/user.js";

// Create a recipe
export async function createRecipe(
  userId,
  { title, ingredients, image, tags },
) {
  const recipe = new Recipe({
    title,
    author: userId,
    ingredients,
    image,
    tags,
  });
  return await recipe.save();
}

// Internal helper to list recipes with sorting
async function listRecipes(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  if (sortBy === "likeCount") {
    return await Recipe.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "likes", // your likes collection
          localField: "_id",
          foreignField: "recipeId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $sort: { likesCount: sortOrder === "descending" ? -1 : 1 },
      },
    ]);
  }

  return await Recipe.find(query).sort({ [sortBy]: sortOrder });
}

// List all recipes
export async function listAllRecipes(options) {
  return await listRecipes({}, options);
}

// List recipes by author
export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername });
  if (!user) return [];
  return await listRecipes({ author: user._id }, options);
}

// List recipes by tag
export async function listRecipesByTag(tag, options) {
  return await listRecipes({ tags: tag }, options);
}

// Get recipe by ID
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId);
}

// Update a recipe
export async function updateRecipe(
  userId,
  recipeId,
  { title, ingredients, image, tags },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, ingredients, image, tags } },
    { new: true },
  );
}

// Delete a recipe
export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId });
}
