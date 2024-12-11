import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import { BlogList } from "./components/BlogList";
import { Notification } from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import { LoginForm } from "./components/LoginForm";
import { LogoutForm } from "./components/LogoutForm";
import { Togglable } from "./components/Togglable";
import { useUserDispatch, useUserValue } from "./UserContext";

const App = () => {
  const userDispatch = useUserDispatch();
  let user = useUserValue();

  const blogFormRef = useRef();

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
      {/* Notifications */}
      {<Notification />}

      <h2>BLOGS</h2>
      {user === null ? <LoginForm /> : <LogoutForm />}

      <br />
      <hr />

      {user !== null && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      )}

      <br />

      {user !== null && <BlogList />}
    </div>
  );
};

export default App;
