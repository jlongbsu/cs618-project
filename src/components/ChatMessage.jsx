import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function ChatMessage({ username, message, link }) {
  return (
    <div>
      <b>{username}</b>: {link ? <Link to={link}>{message}</Link> : message}
    </div>
  );
}
ChatMessage.propTypes = {
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  link: PropTypes.string,
};
