import express from "express";
import { authMiddlewre, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/problem.controllers.js";

const problemRoutes = express.Router();

problemRoutes.post("/create-problem", authMiddlewre, checkAdmin, createProblem);

problemRoutes.get("/get-all-problems", authMiddlewre, getAllProblems);

problemRoutes.get("/get-problem/:id", authMiddlewre, getProblemById);

problemRoutes.put("/update-problem/:id", authMiddlewre, checkAdmin, updateProblem);

problemRoutes.delete("/delete-problem/:id", authMiddlewre, checkAdmin, deleteProblem);

problemRoutes.get("/get-solved-problems", authMiddlewre, getAllProblemsSolvedByUser);

export default problemRoutes;