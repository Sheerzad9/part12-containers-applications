const redisClient = require("../redis");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const length_of_todos = await redisClient.getAsync("length_of_todos");
  const added_todos = await redisClient.getAsync("added_todos");
  return added_todos
    ? res.status(200).json({
        added_todos: +added_todos,
      })
    : res.status(200).json({
        message:
          "There isn't any statistics to show, add a new todo to get statistics",
      });
});

module.exports = router;
