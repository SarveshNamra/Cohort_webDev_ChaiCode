import bcrypt from "bcryptjs";
import db from "../libs/db.js";
import { userRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    const { email, password, name } = req.body;
    
    if(!email || !password || !name) {
        console.log("Data is missing...");
        return res.status(400).json({
            success: false,
            message: "All fields are required !",
        })
    }

    try {
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        }); 
        
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists..."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: userRole.USER
            }
        });

        const token = await jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {
            expiresIn: "5d"
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 5
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image
            }
        });

    } catch (error) {
        console.log("Error in creating user", error);
        res.status(500).json({
            success: false,
            error: "Error in creating user"
        });
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        console.log("Error in email or password");
        return res.status(400).json({
            success: false,
            message: "All fields are required..."
        });
    }

    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: "5d"
        });

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * 5
        })

        res.status(200).json({
            success: true,
            message: "User Logged in successfully !",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image
            }
        })
    } catch (error) {
        console.log("Error in credential user", error);
        res.status(500).json({
            success: false,
            error: "Error in Login user"
        });
    }
}

export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });

        res.status(200).json({
            success: true,
            message: "User Logout successfully..."
        });
    } catch (error) {
        console.log("Error in Logout user", error);
        res.status(500).json({
            success: false,
            error: "Error in Logout user"
        });
    }
}

export const check = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user: req.user
        });
    } catch (error) {
        console.error("Error in check user", error);
        res.status(500).json({
            success: false,
            error: "Error in check user"
        });
    }
}