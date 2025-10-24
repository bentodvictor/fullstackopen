const User = require("../models/user.js");
const { info, error } = require("./logger.js");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  const { method, path, body } = request;

  info("---");
  info(method, ", ", path, ", ", body);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint",
  });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

const errorHandler = (err, request, response, next) => {
  error(err.message);

  if (err.name === "CastError") {
    return response.status(404).send({
      error: "malformatted id",
    });
  } else if (err.name === "ValidationError") {
    return response.status(400).send({
      error: err.message,
    });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).json({
      error: "expected `username` to be unique",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "token invalid",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token invalid" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken?.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: "invalid user" });
  }

  request.user = user;
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
