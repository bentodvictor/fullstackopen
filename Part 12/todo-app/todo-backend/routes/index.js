const express = require("express");
const router = express.Router();
const redis = require("../redis");

const configs = require("../util/config");

let visits = 0;

router.get("/statistics", async (req, res) => {
  const added_todos = Number((await redis.getAsync("added_todos")) || "0");

  res.send({ added_todos });
});

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

module.exports = router;
