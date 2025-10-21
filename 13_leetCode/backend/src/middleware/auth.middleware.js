import jwt from "jsonwebtoken";
import {db} from "../libs/db.js";

export const authMiddlewre = async (req, res, next) => {
    const token = req.cookies?.jwt;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - No token provided"
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Unathorized - Invalid Token"
            });
        }

        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true
            }
        });

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error authorizing the user");
        res.status(500).json({
            success:false,
            message: "Error authorizing user...!"
        });
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if(!userId){
            return res.status(401).json({
                success: false,
                message: "User id not found"
            });
        }

        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        });

        if(!user || user.role !== "ADMIN"){
            return res.status(403).json({
                success: false,
                message: "You don't have permission to this resource - Admins only"
            });
        }

        next();
    } catch (error) {
        console.error("Error checking admin role : ", error);
        return res.status(500).json({
            message: "Error checking admin role"
        });
    }
}