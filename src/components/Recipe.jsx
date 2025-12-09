import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLikeCount } from "../api/likes.js";

export function Recipe({
  title,
  ingredients,
  image,
  author,
  tags,
  _id,
  fullRecipe = false,
}) {
  const { data: countData } = useQuery({
    queryKey: ["likesCount", _id],
    queryFn: () => getLikeCount(_id),
  });

  return (
    <article className="recipe">
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}

      {/* Recipe Image */}
      {image && (
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "300px", borderRadius: "8px" }}
        />
      )}

      {/* Ingredients List */}
      {fullRecipe && Array.isArray(ingredients) && (
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}

      {/* Author */}
      {author && (
        <em>
          <br />
          Posted by <User id={author} />
        </em>
      )}

      {/* Tags (optional) */}
      {tags && tags.length > 0 && (
        <p>
          <strong>Tags:</strong> {tags.join(", ")}
        </p>
      )}

      {!fullRecipe && <p>Likes: {countData?.count ?? 0}</p>}
    </article>
  );
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  _id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
};
