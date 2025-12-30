import express from "express";
import { authMiddlewre } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionForProblem, getSubmissionsForProblem } from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddlewre, getAllSubmission);
submissionRoutes.get("/get-submission/:problemId", authMiddlewre, getSubmissionsForProblem);
submissionRoutes.get("/get-submissions-count/:problemId", authMiddlewre, getAllTheSubmissionForProblem);

export default submissionRoutes;