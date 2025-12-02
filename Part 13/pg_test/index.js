import express from "express";

import { PORT } from "./utils/config.js";
import { connectToDatabase } from "./utils/db.js";

import notesRouter from "./controllers/notes.js";

import { errorHandler } from "./middleware/errorHandlers.js";
import { NotFoundError } from "./utils/errors.js";

const app = express();

app.use(express.json());
app.use(errorHandler());

app.use("/api/notes", notesRouter);

app.use((ctx) => {
  throw new NotFoundError(`The path "${ctx.request.path}" is not found`);
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
