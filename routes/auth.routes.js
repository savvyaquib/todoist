import { Router } from "express";
import { signUp, signIn, signOut } from "../controller/auth.controller.js";



const authRouter = Router();

authRouter.get("/sign-up", async(req, res) => res.render("signUp"))
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn)
authRouter.get("/sign-in", async (req, res) => res.render("signIn"))
authRouter.post("/sign-out", signOut);

export default authRouter;
