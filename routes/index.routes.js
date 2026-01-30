import { Router } from "express";
import { deleteTodo, getTodos, homePage, toggleTodo, updateTodo, getEditTodo } from "../controller/index.controller.js";
import Todo from "../models/todo.model.js";
import { createTodo } from "../controller/index.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
// import { homePage } from "../controller/auth.controller.js";


const indexRouter = Router();

indexRouter.get("/", authorize, homePage)
indexRouter.get("/todos", authorize, getTodos);
indexRouter.post("/todo", authorize, createTodo)
indexRouter.delete("/todos/:id", authorize, deleteTodo);
indexRouter.get("/todos/:id/edit", authorize, getEditTodo);
// indexRouter.patch("/todos/:id/edit", authorize, updateTodo)
indexRouter.patch("/todos/:id", authorize, updateTodo);
indexRouter.get("/todos/new", authorize, (req, res) => {
  res.render("todo-form", {
    todo: null,
    isEdit: false,
  });
});

indexRouter.post("/todos/:id/toggle", authorize, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  await Todo.findByIdAndUpdate(req.params.id, {
    completed: !todo.completed,
  });

  res.redirect("/todos");
});

export default indexRouter;
