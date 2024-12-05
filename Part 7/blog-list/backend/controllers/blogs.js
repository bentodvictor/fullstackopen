const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const { userExtractor } = require("../utils/middleware.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes, userId } = request.body;
  const user = request.user;

  if (!title || !url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user.id,
  });

  await user.save();

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id).populate("user", { id: 1 });
  const user = request.user;

  if (!blog) {
    return response.status(404).end();
  } else if (blog.user.id.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "user not allowed" });
  }

  await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

module.exports = blogsRouter;
