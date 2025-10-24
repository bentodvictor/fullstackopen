import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import blogService from "../services/blogs";

export const BlogForm = ({ blogFormRef }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  function clearnotify() {
    setTimeout(() => {
      notificationDispatch({ types: "clean" });
    }, 5000);
  }

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updatedList = blogs.concat(newBlog);
      queryClient.setQueryData(["blogs"], updatedList);

      notificationDispatch({
        types: "notify",
        payload: {
          type: "success",
          message: `a new blog "${newBlog.title}" by "${newBlog.author}" added`,
        },
      });
      clearnotify();
    },
    onError: () => {
      notificationDispatch({
        types: "notify",
        payload: { type: "success", message: "error creating new blog" },
      });
      clearnotify();
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();

    const formData = new FormData(event.target);

    const blog = {
      title: formData.get("title"),
      author: formData.get("author"),
      url: formData.get("url"),
    };

    addBlogMutation.mutate(blog);
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input data-testid="title" type="text" name="title" id="title" />
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
