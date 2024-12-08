import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogs,
  incrementVote,
  toggleView,
} from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleLike = async (blog) => {
    const body = {
      ...blog,
      user: { ...blog.user },
      likes: blog.likes + 1,
    };

    await dispatch(incrementVote(blog.id, body));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClickDetails = () => dispatch(toggleView(blog.id));

  const handleDelete = async () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (confirmation) {
      try {
        await dispatch(deleteBlogs(blog.id));
        await dispatch(notify({ type: "success", message: "blog deleted" }));
      } catch (err) {
        await dispatch(
          notify({
            type: "error",
            message: `Error: ${err.response.data.error}`,
          }),
        );
      }
    }
  };

  const label = blog?.visible ? "hide" : "show";

  const removeBtn =
    blog.user.username === user.username ? (
      <button onClick={handleDelete}>remove</button>
    ) : (
      <span></span>
    );

  const blogView = (
    <div className="blog">
      <p>
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button onClick={handleClickDetails}>{label}</button>
      </p>
    </div>
  );

  const blogDetailsView = (
    <div className="blog">
      <p>{blog.title}</p>
      <span>
        <button onClick={handleClickDetails}>{label}</button>
      </span>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={() => handleLike(blog)}>add like</button>
      </p>
      <p>{blog.author}</p>
      {removeBtn}
    </div>
  );

  return (
    <div style={blogStyle}>
      {!blog?.visible && blogView}
      {blog?.visible && blogDetailsView}
    </div>
  );
};

export default Blog;
