import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import { BlogList } from "./components/BlogList";
import { Notification } from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import { LoginForm } from "./components/LoginForm";
import { LogoutForm } from "./components/LogoutForm";
import { Togglable } from "./components/Togglable";
import { useUserDispatch, useUserValue } from "./UserContext";
import { Menu } from "./components/Menu";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/Home";
import Blog from "./components/Blog";
import { UserList } from "./components/UserList";
import { User } from "./components/User";

const App = () => {
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();
  let user = useUserValue();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJson) {
      const storedUser = JSON.parse(loggedUserJson); // Parse and store
      userDispatch({ type: "setUser", payload: storedUser }); // Update the context
      blogService.setToken(storedUser.token); // Set the token for blog service
    }
  }, [userDispatch]);

  return (
    <div>
      <Menu />
      {<Notification />}
      <h2>BLOGS</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={!user ? <LoginForm /> : <Home />} />
      </Routes>
    </div>
  );
};

export default App;
