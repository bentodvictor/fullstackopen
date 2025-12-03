import { Router } from "express";
import { Op } from "sequelize";
import { tokenExtractor } from "../middleware/tokenExtractor.js";
import { Blog, User } from "../models/index.js";

const router = Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
    },
  });
  next();
};

router.get("/", async (req, res) => {
  try {
    const where = {};

    // Search
    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.substring]: req.query.search } },
        { author: { [Op.substring]: req.query.search } },
      ];
    }

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
      order: [["likes", "DESC"]],
    });

    blogs.forEach((blog) => {
      const { author, title, likes } = blog.dataValues;
      console.log(`${author}: ${title}, ${likes} likes`);
    });

    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id); // Find first user in the database
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });

    return res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  try {
    if (!req.blog) res.status(401).end();

    const user = await User.findByPk(req.decodedToken.id); // Find first user in the database

    if (req.blog.userId != user.id) res.status(401).end();

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

router.get("/authors", async (req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("id")), "articles"],
        [fn("COUNT", col("likes")), "likes"],
      ],
      group: ["author"],
      oder: [[fn("SUM", col("likes")), "DESC"]],
    });

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
