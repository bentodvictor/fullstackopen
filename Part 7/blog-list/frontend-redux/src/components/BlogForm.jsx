import { useDispatch } from "react-redux";
import { addNewBlog } from "../reducers/blogReducer";

export const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    const formData = new FormData(event.target);

    const blog = {
      title: formData.get("title"),
      author: formData.get("author"),
      url: formData.get("url"),
    };

    dispatch(addNewBlog(blog));
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input data-testid="title" type="text" name="title" />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input data-testid="author" type="text" name="author" id="author" />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input data-testid="url" type="text" name="url" id="url" />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};
