import Todo from "../models/todo.model.js";
import dayjs from "dayjs";

let now = dayjs().format("YYYY-MM-DD");

export const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });

  const formattedTodos = todos.map((todo) => ({
    ...todo.toObject(),
    dueDate: todo.dueDate
      ? new Date(todo.dueDate).toDateString()
      : "No deadline",
  }));

  // const { completed } = req.body;
  // console.log(completed);

  // console.log(req.body.id)
  res.render("index", { todos: formattedTodos || [] });
  // res.render("index", { todos });
};

export const createTodo = async (req, res) => {
  const { task, completed, important, priority, dueDate } = req.body;
  console.log(task, completed, important, priority, dueDate);
  const newTodo = await Todo.create({
    task: task,
    completed: completed,
    priority: priority,
    important: important === "on",
    dueDate: dueDate || now,
  });
  res.json({
    success: true,
    message: "You got it",
    data: newTodo,
  });
};

export const toggleTodo = async (req, res, next) => {
  try {
    await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userId
      },
      {
        completed: req.body.completed
      }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// export const updateTodo = async (req, res) => {
//   const { completed } = req.body;
//   console.log(completed)
// };
