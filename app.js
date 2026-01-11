import express from "express"
import Todo from "./models/todo.model.js"
import connectToDatabase from "./config/db.js"
import dotenv from "dotenv";
import indexRouter from "./routes/index.routes.js";
import { createTodo } from "./controller/index.controller.js";

dotenv.config()

const app = express()

// const todos = await Todo.find().lean();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set("view engine", "ejs");


app.get("/todo", (req, res) => {
    res.render("todo")
})

app.post("/todo", createTodo)

app.use("/", indexRouter)


app.listen(3000, () => {
    console.log("App is running at http://localhost:3000")
    connectToDatabase()
})


