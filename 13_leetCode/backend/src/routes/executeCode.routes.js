import express from "express";
import { authMiddlewre } from "../middleware/auth.middleware";
import { executeCode } from "../controllers/executeCode.controllers";

const executionRoute = express.Router();

executionRoute.post("/", authMiddlewre, executeCode)



export default executionRoute;