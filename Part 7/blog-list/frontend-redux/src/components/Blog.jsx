import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteBlogs,
  incrementVote,
  toggleView,
} from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";
import { useNavigate, useParams, useResolvedPath } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();
  const { id: blogId } = useParams();
  const user = useSelector((state) => state.auth);
  const blog = useSelector((state) => state.blog).find((b) => b.id === blogId);

  const handleComment = async (event) => {
    event.preventDefault();
    const { comment } = event.target;
    dispatch(addComment(blogId, comment.value));
    event.target.comment.value = "";
  };

  const handleLike = async (blog) => {
    const body = {
      ...blog,
      user: { ...blog.user },
      likes: blog.likes + 1,
    };

    await dispatch(incrementVote(blog.id, body));
  };

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

  const removeBtn =
    blog?.user?.username === user?.username ? (
      <button onClick={handleDelete}>remove</button>
    ) : (
      <span></span>
    );

  return (
    <div className="blog">
      <h1>{blog?.title}</h1>
      <a href={blog?.url}>{blog?.url}</a>
      <p>
        {blog?.likes} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </p>
      <p>added by {blog?.author}</p>
      {removeBtn}
      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog?.comments?.map((b) => {
            return <li key={b.id}>{b.content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
