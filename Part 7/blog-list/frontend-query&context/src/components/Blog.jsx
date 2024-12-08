import { useState } from "react";

const Blog = ({ blog, username, handleLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClickDetails = () => setShowDetails(!showDetails);

  const handleDelete = () => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (confirmation) {
      deleteBlog(blog.id);
    }
  };

  const label = showDetails ? "hide" : "show";

  const removeBtn =
    blog.user.username === username ? (
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
        likes {blog.likes}{" "}
        <button onClick={() => handleLike(blog)}>add like</button>
      </p>
      <p>{blog.author}</p>
      {removeBtn}
    </div>
  );

  return (
    <div style={blogStyle}>
      {!showDetails && blogView}
      {showDetails && blogDetailsView}
    </div>
  );
};

export default Blog;
