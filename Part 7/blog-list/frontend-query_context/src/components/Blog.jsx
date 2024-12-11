import { useState } from "react";
import { useUserValue } from "../UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const user = useUserValue();
  const notificationDispatch = useNotificationDispatch();

  const clearNotification = () =>
    setTimeout(() => {
      notificationDispatch({ types: "clean" });
    }, 5000);

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedList = blogs.filter((b) => b.id !== deletedBlog.id);

      queryClient.setQueryData(["blogs"], updatedList);
    },
  });

  const handleDelete = async (blogId) => {
    try {
      const confirmation = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`,
      );

      if (!confirmation) return;

      deleteBlogMutation.mutate(blog.id);

      notificationDispatch({
        types: "notify",
        payload: {
          type: "success",
          message: "blog deleted.",
        },
      });

      clearNotification();
    } catch (err) {
      notificationDispatch({
        types: "notify",
        payload: {
          type: "error",
          message: err.response.data.error,
        },
      });

      clearNotification();
    }
  };

  const handleLikeMutation = useMutation({
    mutationFn: ({ blogId, newBlog }) => blogService.update(blogId, newBlog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedList = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );

      queryClient.setQueryData(["blogs"], updatedList);
    },
  });
  const handleLike = async (blog) => {
    const body = {
      ...blog,
      user: blog.user?.id,
      likes: blog.likes + 1,
    };
    console.log({ body });
    handleLikeMutation.mutate({ blogId: blog.id, newBlog: body });
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleClickDetails = () => setShowDetails(!showDetails);

  const label = showDetails ? "hide" : "show";

  const removeBtn =
    blog.user.username === user?.username ? (
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
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      {!showDetails && blogView}
      {showDetails && blogDetailsView}
    </div>
  );
};

export default Blog;
