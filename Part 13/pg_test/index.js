import dotenv from "dotenv";
import express from "express";
import Blog from "./models/Blog.js";
import Note from "./models/Note.js";

dotenv.config();
const app = express();

// NOTES context
app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();

  return res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    // const note = Note.build(req.body)
    // note.important = true
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.noteId);

    if (note) res.status(200).json({ note });

    res.status(404).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      note.important = req.body.important;
      await note.save();
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// BLOGS context
app.get("/api/blogs", async (req, res) => {
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

app.post("/api/blogs", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    return res.status(201).json({ blog });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!result) res.status(401).end();

    await blog.destroy();

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async (err, res) => {
  console.log(`Server running on port ${PORT}`);
});
