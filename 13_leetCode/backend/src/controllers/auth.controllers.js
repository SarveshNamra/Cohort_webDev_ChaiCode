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
                error: "User already exists..."
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
            error: "Error in creating user"
        });
    }
};

export const login = async(req, res) => {}

export const logout = async(req, res) => {}

export const check = async(req, res) => {}