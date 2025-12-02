import PropTypes from "prop-types";
import { User } from "./User.jsx";

export function Recipe({ title, ingredients, image, author, tags }) {
  return (
    <article className="recipe">
      <h3>{title}</h3>

      {/* Recipe Image */}
      {image && (
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "300px", borderRadius: "8px" }}
        />
      )}

      {/* Ingredients List */}
      {Array.isArray(ingredients) && (
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
    </article>
  );
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
