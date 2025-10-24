const blogsRouter = require("express").Router();
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog.js");
const Comment = require("../models/comments.js");
const { userExtractor } = require("../utils/middleware.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate("comments");

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate("comments");

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

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { id: 1, username: 1, name: 1 });

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

// Comments
blogsRouter.get("/:id/comments", userExtractor, async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid blog Id");

  const comments = await Comment.find({ blogs: id }).exec();

  response.status(200).json();
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { content } = request.body;

  console.log({ id });
  console.log({ content });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(403).end();
  }

  const blog = await Blog.findById(id);
  const comment = new Comment({
    content: content,
    blogs: blog.id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment.id);

  await blog.save();

  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
