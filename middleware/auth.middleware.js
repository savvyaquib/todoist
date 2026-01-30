import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("token from cookie:", token);

    if (!token) {
      return res.render("signIn");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded:", decoded);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.render("signIn");
    }

    req.user = user;
    // console.log(" user:::::::", user)
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.render("signIn");
  }
}