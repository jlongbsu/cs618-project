import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { createRecipe } from "../api/recipes.js";
import { useChat } from "../hooks/useChat.js";

export function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [token] = useAuth();
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const queryClient = useQueryClient();
  const { sendMessage } = useChat();

  const createRecipeMutation = useMutation({
    mutationFn: () =>
      createRecipe(token, {
        title,
        ingredients: ingredients.split("\n"),
        image,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    onSuccess: (recipe) => {
      queryClient.invalidateQueries(["recipes"]),
        sendMessage({
          message: `New recipe created: ${recipe.title}`,
          link: `/recipes/${recipe._id}`,
          username: "System",
        });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipeMutation.mutate();
  };
  if (!token) return <div>Please log in to create new posts.</div>;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          id="create-title"
          name="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="create-ingredients">Ingredients (one per line):</label>
        <textarea
          id="create-ingredients"
          name="create-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={5}
        />
      </div>
      <br />

      <div>
        <label htmlFor="create-image">Image URL:</label>
        <input
          type="text"
          id="create-image"
          name="create-image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="create-tags">Tags (comma separated):</label>
        <input
          type="text"
          id="create-tags"
          name="create-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <br />

      <input
        type="submit"
        value={createRecipeMutation.isPending ? "Creating..." : "Create Recipe"}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  );
}
