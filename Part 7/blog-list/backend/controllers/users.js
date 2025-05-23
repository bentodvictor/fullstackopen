const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (password.length < 3) {
      return response.status(400).json({ error: "password is too short" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // only stores the hash
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  response.status(200).json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const users = await User.findById(id).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  response.status(200).json(users);
});

module.exports = usersRouter;
