import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";

// Import all routes
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Using cors.
app.use(
    cors({
        origin: process.env.BASE_URL,
        credentials:true,
        methods:['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders:['Content-Type', 'Authorization'],
    })
);

app.use(express.json());        // to take data in json
app.use(express.urlencoded({extended: true}));   // To take data from url.
app.use(cookieParser());      // Now we are able to access cookies form request and responce also

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Cohort !");
});

// console.log(process.env.PORT);

// Connecting database
db();

// user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

