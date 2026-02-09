import { Router } from "express";
import { deleteTodo, getTodos, homePage, toggleTodo, updateTodo, getEditTodo } from "../controller/index.controller.js";
import Todo from "../models/todo.model.js";
import { createTodo } from "../controller/index.controller.js";
import { authorize, softAuth } from "../middleware/auth.middleware.js";


const indexRouter = Router();

indexRouter.get("/", softAuth, homePage)

indexRouter.get("/todos", authorize, getTodos);

indexRouter.post("/todo", authorize, createTodo)

indexRouter.delete("/todos/:id", authorize, deleteTodo);

indexRouter.get("/todos/:id/edit", authorize, getEditTodo);

indexRouter.patch("/todos/:id", authorize, updateTodo);

indexRouter.get("/todos/new", authorize, (req, res) => {
  res.render("todo-form", {
    todo: null,
    isEdit: false,
    user: req.user || null
  });
});

indexRouter.post("/todos/:id/toggle", authorize, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  await Todo.findByIdAndUpdate(req.params.id, {
    completed: !todo.completed,
  });

  res.redirect("/todos");
});

indexRouter.get("/privacy", softAuth, (req, res) =>
  res.render("privacy", { user: req.user || null })
);

indexRouter.get("/terms", softAuth, (req, res) =>
  res.render("terms", { user: req.user || null })
);

indexRouter.get("/cookies", softAuth, (req, res) =>
  res.render("cookies", { user: req.user || null })
);

export default indexRouter;
