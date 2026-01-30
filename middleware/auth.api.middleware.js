import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authorizeApi = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // return res.status(401).json({ message: "Not authorized" });
      return res.render("signIn")  
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded ", decoded)

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = user; // 🔥 THIS IS THE KEY LINE
    // console.log(req.user)
    next();
  } catch (error) {
    next(error);
  }
};
