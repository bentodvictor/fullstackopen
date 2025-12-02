import { Router } from "express";
import Note from "../models/Note.js";

const router = Router();

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const notes = await Note.findAll();

  return res.json(notes);
});

router.post("/", async (req, res) => {
  try {
    const note = await Note.create(req.body);
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
