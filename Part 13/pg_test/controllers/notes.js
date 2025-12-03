import { Router } from "express";
import { Op } from "sequelize";
import { tokenExtractor } from "../middleware/tokenExtractor.js";
import { Note, User } from "../models/index.js";

const router = Router();

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.important) {
    where.important = req.query.important === "true";
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search,
    };
  }

  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });

  return res.json(notes);
});

router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id); // Find first user in the database
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    // const note = Note.build(req.body)
    // note.important = true
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", noteFinder, async (req, res) => {
  try {
    if (req.note) res.status(200).json({ note: req.note });

    res.status(404).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:id", noteFinder, async (req, res) => {
  try {
    if (req.note) {
      req.note.important = req.body.important;
      await req.note.save();
      res.json(req.note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    await req.note.destroy();
  }
  res.status(204).end();
});

export default router;
