import Todo from "../models/todo.model.js";
import dayjs from "dayjs";

let now = dayjs().format("YYYY-MM-DD");

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });

  const formattedTodos = todos.map((todo) => ({
    ...todo.toObject(),
    dueDate: todo.dueDate
      ? new Date(todo.dueDate).toDateString()
      : "No deadline",
  }));

  res.render("todos", { todos: formattedTodos || [], user: req.user || null });
};

export const createTodo = async (req, res) => {
  const { task, completed, priority, dueDate } = req.body;
  const user = await req.user._id;
  const newTodo = await Todo.create({
    task: task,
    completed: completed,
    priority: priority,
    // important: important === "on",
    dueDate: dueDate || now,
    user: user,
  });
  // res.json({
  //   success: true,
  //   message: "You got it",
  //   data: newTodo,
  // });
  res.redirect("/todos")
};

export const toggleTodo = async (req, res, next) => {
  try {
    await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userId,
      },
      {
        completed: req.body.completed,
      }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id, // 🔥 ownership check
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ success: true });
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, priority, dueDate } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id }, // 🔐 ownership
      {
        task,
        priority,
        dueDate: dueDate || now,
      },
      { new: true }
    );

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
};


export const getEditTodo = async (req, res) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!todo) {
    return res.status(404).send("Todo not found");
  }

  res.render("todo-form", {
    todo,
    isEdit: true,
    user: req.user || null,
  });
};


export const homePage = (req, res) => {
  res.render("home", {
    user: req.user || null,
  });
};

