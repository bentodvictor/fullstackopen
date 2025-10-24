import { useNavigate } from "react-router";
import { useUserDispatch, useUserValue } from "../UserContext";

export const LogoutForm = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();

    userDispatch({ type: "removeUser" });
    window.localStorage.removeItem("loggedBlogappUser");

    navigate("/login");
  };

  return (
    <div>
      <span>{user?.username} logged-in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
