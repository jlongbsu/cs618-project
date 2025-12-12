import { Link } from "react-router-dom";
import { User } from "./User.jsx";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useSocket } from "../contexts/SocketIOContext.jsx";
export function Header() {
  const [token, setToken] = useAuth();
  const { socket } = useSocket();
  const handleLogout = () => {
    socket.disconnect();
    setToken(null);
  };

  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <div>
        <h1>Welcome to the Hergin Recipe Sharing Site!</h1>
        Logged in as <User id={sub} />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome to the Hergin Recipe Sharing Site!</h1>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign Up</Link>
    </div>
  );
}
