import { useUserDispatch, useUserValue } from "../UserContext";

export const LogoutForm = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const handleLogout = (event) => {
    event.preventDefault();

    userDispatch({ types: "removeUser" });
    window.localStorage.removeItem("loggedBlogappUser");
  };

  return (
    <div>
      <p>
        <span>{user?.username}</span> <span>logged-in</span>
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
