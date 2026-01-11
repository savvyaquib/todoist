import { Router } from "express";
import { getTodos, toggleTodo } from "../controller/index.controller.js";
import Todo from "../models/todo.model.js";

const indexRouter = Router();

indexRouter.get("/", getTodos);
indexRouter.get("/todos/new", (req, res) => res.render("todo"));
indexRouter.post("/todos/:id/toggle", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  await Todo.findByIdAndUpdate(req.params.id, {
    completed: !todo.completed,
  });

  res.redirect("/");
});

export default indexRouter;
