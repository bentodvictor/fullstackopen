import { useState } from "react";
import { useUserValue } from "../UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { useNavigate, useParams } from "react-router";

const Blog = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUserValue();
  const notificationDispatch = useNotificationDispatch();

  // Correção: Hook useQuery sempre será chamado fora de blocos condicionais
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => blogService.getBlog(blogId),
    refetchOnWindowFocus: false,
  });

  const clearNotification = () => {
    setTimeout(() => {
      notificationDispatch({ type: "clean" });
    }, 5000);
  };

  // Hooks de mutations
  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const filteredBlogs = blogs.filter((b) => b.id !== deletedBlog.id);
      queryClient.setQueryData(["blogs"], filteredBlogs);

      navigate("/");
    },
  });

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id);

      notificationDispatch({
        type: "notify",
        payload: {
          type: "success",
          message: "Blog deleted successfully.",
        },
      });

      clearNotification();
    }
  };

  const handleCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) =>
      blogService.addComment(blogId, comment),
    onSuccess: (newComment) => {
      const blog = queryClient.getQueryData(["blog", blogId]);
      queryClient.setQueryData(["blog"], blog.comments.push(newComment));

      // Atualiza também a lista geral de blogs, se existir
      const blogs = queryClient.getQueryData(["blogs"]);
      if (blogs) {
        const updatedBlogs = blogs.map((b) =>
          b.id === blog.id ? b.push(newComment) : b,
        );
        queryClient.setQueryData(["blogs"], updatedBlogs);
      }
    },
  });
  const handleComment = (event) => {
    event.preventDefault();

    const { comment } = event.target;
    handleCommentMutation.mutate({ blogId, comment: comment.value });
    event.target.comment.value = "";
  };

  const handleLikeMutation = useMutation({
    mutationFn: ({ blogId, newBlog }) => blogService.update(blogId, newBlog),
    onSuccess: (updatedBlog) => {
      // Corrigido: usar a queryKey correta para o blog específico
      const blog = queryClient.getQueryData(["blog", updatedBlog.id]);

      if (blog) {
        queryClient.setQueryData(["blog", updatedBlog.id], {
          ...blog,
          likes: updatedBlog.likes,
        });
      }

      // Atualiza também a lista geral de blogs, se existir
      const blogs = queryClient.getQueryData(["blogs"]);
      if (blogs) {
        const updatedBlogs = blogs.map((b) =>
          b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b,
        );
        queryClient.setQueryData(["blogs"], updatedBlogs);
      }
    },
  });

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      user: blog.user?.id,
      likes: blog.likes + 1,
    };
    handleLikeMutation.mutate({ blogId: blog.id, newBlog: updatedBlog });
  };

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  console.log(blog?.user?.username);
  console.log(user?.username);
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
