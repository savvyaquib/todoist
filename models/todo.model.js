import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Task is required."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    required: [true, "Priority is requied"],
    enum: ["High", "Medium", "Low"],
  },
  dueDate: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
    index: true,
  }
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
