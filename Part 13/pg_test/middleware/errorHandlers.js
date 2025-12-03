import { ApplicationError, ValidationError } from "../utils/errors.js";

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: e.errors.map((err) => err.message).join("\n"),
      };

      return;
    }

    if (e instanceof SequelizeValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: e.errors.map((err) => err.message).join("\n"),
      };
      return;
    }

    const normalizedError =
      e instanceof ApplicationError
        ? e
        : new ApplicationError("Something went wrong");

    ctx.status = normalizedError.status;
    ctx.body = { error: [normalizedError.message] };
  }
};

export { errorHandler };
