import express from "express";
import dotenv from "dotenv";
import authRouts from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hallo guys welcome to leetCode...")
});

app.use("/api/v1/auth", authRouts);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})