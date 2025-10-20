import express from "express";
import { check, login, logout, register } from "../controllers/auth.controllers.js";
import { authMiddlewre } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddlewre, logout);

authRoutes.get("/check", authMiddlewre, check);

export default authRoutes;