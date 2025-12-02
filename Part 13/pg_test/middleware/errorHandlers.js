import { ApplicationError } from "../utils/errors.js";

const errorHandler = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const normalizedError =
      e instanceof ApplicationError
        ? e
        : new ApplicationError("Something went wrong");

    ctx.status = normalizedError.status || 500;
    ctx.body = normalizedError;

    logger.error(e, { path: ctx.request.path });
  }
};

export { errorHandler };
