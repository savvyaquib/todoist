import express from "express"
import Todo from "./models/todo.model.js"
import connectToDatabase from "./config/db.js"
import dotenv from "dotenv";
import indexRouter from "./routes/index.routes.js";
import { createTodo } from "./controller/index.controller.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

dotenv.config()

const app = express()


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use("/", indexRouter)
app.use("/auth", authRouter)


app.listen(3000, () => {
    console.log("App is running at http://localhost:3000")
    connectToDatabase()
})


