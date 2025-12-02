import { Router } from "express";
import Blog from "../models/Blog";

const router = Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    blogs.forEach((blog) => {
      const { author, title, likes } = blog.dataValues;
      console.log(`${author}: ${title}, ${likes} likes`);
    });
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    return res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  try {
    if (!req.blog) res.status(401).end();

    await blog.destroy();

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.blog) res.status(401).end();

    req.blog.likes = req.body;
    await req.blog.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).send({ error });
  }
});
export default router;
