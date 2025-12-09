import { Like } from "../db/models/like.js";

export async function addLike(recipeId, userId) {
  try {
    const like = await Like.create({ recipeId, userId });
    return like;
  } catch (err) {
    // Handle duplicate like (unique index violation)
    if (err.code === 11000) {
      throw new Error("User already liked this recipe");
    }
    throw err;
  }
}

export async function removeLike(recipeId, userId) {
  const result = await Like.findOneAndDelete({ recipeId, userId });
  return result;
}

export async function countLikes(recipeId) {
  const count = await Like.countDocuments({ recipeId });
  return count;
}

export async function hasUserLiked(recipeId, userId) {
  const like = await Like.findOne({ recipeId, userId });
  return !!like;
}
