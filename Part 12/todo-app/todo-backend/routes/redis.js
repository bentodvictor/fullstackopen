const express = require("express");
const router = express.Router();
const redis = require("../redis");
console.log("✅ redisRouter carregado!");
router.get("/statistics", async (_, res) => {
  const added_todos = Number((await redis.getAsync("added_todos")) || "0");

  res.send({ added_todos });
});

module.exports = router;
