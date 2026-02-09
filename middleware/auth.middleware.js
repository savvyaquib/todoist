import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.render("signIn");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.render("signIn");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.render("signIn");
  }
}

export const softAuth = async (req, res, next) => {
  // this auth is for logged-in as well as logged-out users
  try {
    const token = req.cookies?.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    req.user = user || null;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};