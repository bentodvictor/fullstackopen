import { Router } from "express";
import { Blog, Note, ReadingList, Team, User } from "../models/index.js";
import { tokenExtractor } from "../middleware/tokenExtractor.js";

const router = Router();

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const readFilter = ctx.query.read;

  let throughWhere = {};

  if (readFilter === "true") {
    throughWhere.read = true;
  }
  if (readFilter === "false") {
    throughWhere.read = false;
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Note,
        as: "marked_notes",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: [],
        },
        include: {
          model: user,
          attributes: ["name"],
        },
      },
      {
        model: Blog,
        as: "readings",
        through: {
          attributes: ["id", "url", "title", "author", "likes", "year"],
          through: {
            model: ReadingList,
            attributes: ["id", "read"],
            where: Object.keys(throughWhere).length ? throughWhere : undefined,
          },
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).end();
  }

  let teams = undefined;
  if (req.query.teams) {
    teams = await user.getTeams({
      attributes: ["name"],
      joinTableAttributes: [],
    });
  }
  res.json({ ...user.toJSON(), teams });
});

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (user) {
      user.disabled = req.body.disabled;
      await user.save();
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/readinglists", async (ctx) => {
  const { userId, blogId } = ctx.request.body;

  const entry = await ReadingList.create({
    userId,
    blogId,
    read: false,
  });

  ctx.body = entry;
});

router.put("/readinglists/:id", async (ctx) => {
  const entry = await ReadingList.findByPk(ctx.params.id);

  if (!entry) {
    ctx.throw(404, "Not found");
  }

  // only the owner can mark as read
  if (entry.userId !== ctx.state.user.id) {
    ctx.throw(401, "Unauthorized");
  }

  entry.read = ctx.request.body.read;
  await entry.save();

  ctx.body = entry;
});

export default router;
