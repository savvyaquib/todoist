import { Router } from "express";
// import { signUp } from "../controllers/auth.controller.js";
import { signUp, signIn, signOut } from "../controller/auth.controller.js";
import { authorize } from "../middleware/auth.middleware.js";



const authRouter = Router();

authRouter.get("/sign-up", async(req, res) => res.render("signUp"))
authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn)
authRouter.get("/sign-in", async (req, res) => res.render("signIn"))
authRouter.post("/sign-out", signOut);

// authRouter.post("/sign-out", signOut)

export default authRouter;
