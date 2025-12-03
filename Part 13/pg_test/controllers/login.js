import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";

import { User } from "../models/index.js";
import { SECRET } from "../utils/config.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    const passwordCorrect =
      user && (await bcrypt.compare(password, user.passwordHash));

    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    if (user.disabled) {
      return res
        .status(401)
        .json({ error: "account disabled, please contact admin" });
    }

    const token = jwt.sign({ username: user.username, id: user.id }, SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (e) {
    next(e); // send error to Express error handler
  }
});

export default router;
