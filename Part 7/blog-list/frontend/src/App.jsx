import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { BlogList } from "./components/BlogList";
import { Notification } from "./components/Notification";
import { BlogForm } from "./components/BlogForm";
import { LoginForm } from "./components/LoginForm";
import { LogoutForm } from "./components/LogoutForm";
import { Togglable } from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    loadBlogs();
    setUserToken();
  }, []);

  const setUserToken = () => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (ex) {
      setError(ex.response.data.error);

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    setUsername("");
    setPassword("");
  };

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      const newBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(newBlogs);
      setSuccess("blog deleted");
    } catch (err) {
      setError(`Error: ${err.response.data.error}`);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    const formData = new FormData(event.target);

    const blog = {
      title: formData.get("title"),
      author: formData.get("author"),
      url: formData.get("url"),
    };

    const response = await blogService.create(blog);

    if (response?.id) {
      await loadBlogs();
      setSuccess(
        `a new blog "${response.title}" by "${response.author}" added`,
      );
    }

    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  const handleLike = async (blog) => {
    const body = {
      ...blog,
      user: blog.user?.id,
      likes: ++blog.likes,
    };

    const response = await blogService.update(blog.id, body);

    if (response?.id) {
      await loadBlogs();
    }
  };

  const handleUsername = ({ target }) => setUsername(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  const loadBlogs = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

  return (
    <div>
      {/* Notifications */}
      {error && <Notification type="error" message={error} />}
      {success && <Notification type="success" message={success} />}

      <h2>BLOGS</h2>
      {user === null ? (
        <LoginForm
          password={password}
          username={username}
          handleLogin={handleLogin}
          onChangeUsername={handleUsername}
          onChangeValue={handlePassword}
        />
      ) : (
        <LogoutForm username={user?.username} onClickLogout={handleLogout} />
      )}

      <br />
      <hr />

      {user !== null && (
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}

      <br />

      {user !== null && (
        <BlogList
          blogs={blogs}
          username={user?.username}
          handleLike={handleLike}
          deleteBlog={deleteBlog}
          F
        />
      )}
    </div>
  );
};

export default App;
