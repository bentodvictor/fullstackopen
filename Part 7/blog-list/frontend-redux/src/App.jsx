import { useEffect, useRef } from "react";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { userAlreadyLoggedin } from "./reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Home } from "./components/Home";
import Blog from "./components/Blog";
import { UserList } from "./components/UserList";
import { User } from "./components/User";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(userAlreadyLoggedin());
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) navigate("/login");

  return (
    <div>
      <Menu />
      <Notification />
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
