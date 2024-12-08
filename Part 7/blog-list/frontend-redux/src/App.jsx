import { useEffect, useRef } from "react";
import { BlogList } from "./components/BlogList";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { LogoutForm } from "./components/LogoutForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { userAlreadyLoggedin } from "./reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(userAlreadyLoggedin());
  }, []);

  return (
    <div>
      <Notification />

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
