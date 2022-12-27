const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  return res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("req.todo._id: ", req.todo._id);
  if (req.body.text) {
    const response = await Todo.findByIdAndUpdate(
      req.todo._id,
      {
        text: req.body.text,
      },
      { new: true }
    );
    res.status(200).send(response);
  }
  // const response = await Todo.findByIdAndUpdate(
  //   req.todo._id,
  //   { ...req.body },
  //   {
  //     new: true,
  //   }
  // );
  // if (response) return res.status(200).send(res);
  //res.sendStatus(405); // Implement this
  res.status(201).end();
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
