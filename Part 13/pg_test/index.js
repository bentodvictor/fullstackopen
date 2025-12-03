import express from "express";

import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";

import blogsRouter from "./controllers/blogs.js";
import loginRouter from "./controllers/login.js";
import notesRouter from "./controllers/notes.js";
import usersRouter from "./controllers/users.js";

import { errorHandler } from "./middleware/errorHandlers.js";

const app = express();

app.use(express.json());
app.use(errorHandler());

app.use("/api/notes", notesRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
