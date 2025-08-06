import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// costom routes
import userRoutes from './routes/auth.route.js';

dotenv.config();

const port = process.env.PORT || 4000
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        message: "test checked",
    });
});

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
    console.log(`Backend is listened at port ${port}`);
})