import express from "express";
import { authMiddlewre } from "../middleware/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controllers.js";

const executionRoute = express.Router();

executionRoute.post("/", authMiddlewre, executeCode)



export default executionRoute;