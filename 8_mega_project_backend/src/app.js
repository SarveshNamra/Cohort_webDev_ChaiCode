import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import noteRouter from "./routes/note.routes.js";
// optional when you add endpoints inside them:
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(cookieParser());

// router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter)

// add below healthcheck mount
app.use("/api/v1/user", authRouter);
app.use("/api/v1/notes", noteRouter);
// optional:
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

export default app;