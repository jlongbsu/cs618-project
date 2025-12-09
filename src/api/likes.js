export const postLike = (recipeId, token) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const deleteLike = (recipeId, token) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const getLikeCount = (recipeId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}/count`).then(
    (res) => res.json(),
  );

export const getUserLiked = (recipeId, token) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
