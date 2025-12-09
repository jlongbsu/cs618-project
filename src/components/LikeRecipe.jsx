import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  postLike,
  deleteLike,
  getLikeCount,
  getUserLiked,
} from "../api/likes.js";
import PropTypes from "prop-types";

export function LikeRecipe({ recipeId }) {
  const [token] = useAuth(); // same pattern as CreateRecipe
  const queryClient = useQueryClient();

  // Fetch like count
  const { data: countData } = useQuery({
    queryKey: ["likesCount", recipeId],
    queryFn: () => getLikeCount(recipeId),
  });

  // Fetch whether current user liked (only if signed in)
  const { data: userData } = useQuery({
    queryKey: ["userLiked", recipeId],
    queryFn: () => getUserLiked(recipeId, token),
    enabled: !!token,
  });

  // Mutations
  const likeMutation = useMutation({
    mutationFn: () => postLike(recipeId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["likesCount", recipeId]);
      queryClient.invalidateQueries(["userLiked", recipeId]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => deleteLike(recipeId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["likesCount", recipeId]);
      queryClient.invalidateQueries(["userLiked", recipeId]);
    },
  });

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>Likes: {countData?.count ?? 0}</p>
      {!token ? (
        <div>Please log in to like this recipe.</div>
      ) : userData?.userLiked ? (
        <button
          onClick={() => unlikeMutation.mutate()}
          disabled={unlikeMutation.isPending}
        >
          👎 Unlike
        </button>
      ) : (
        <button
          onClick={() => likeMutation.mutate()}
          disabled={likeMutation.isPending}
        >
          👍 Like
        </button>
      )}
    </div>
  );
}

LikeRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
};
