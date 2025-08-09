import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";  // PrismaClient - This helps to connect and talk with database.
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();  // Abb hamnay prisma banaleya hai to abb database connection ki koe jarurat nahi.

export const registerUser = async (req,res) => {
    // This is Boilar-Plate
    // console.log("user registered");
    // await prisma.user.findUnique({
    //     where: {email}
    // })
    // if(user){
    //     return res.status(400).json({
    //         message: "User already exists"
    //     })
    // }
    // const newUser = await prisma.user.create({})

    // Taking the data form user.
    const { name, email, password, phone } = req.body;

    // verify.
    if( !name || !email || !password || !phone){
        console.log("Data is messing");
        res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    // Datadase ke sath panga to try{} catch(){} block is necessary.
    try {
        // Check is user arleady exsists.
        const existingUser = prisma.User.findUnique({
            where:{email}
        })
        
        // if existingUser already exsists in DB the return statrus.
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User Already exists",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creating a token
        const verificationToken = crypto.randomBytes(32).toString("hex")

        // Creating user
        const user = await prisma.user.create({
            data:{
                name,
                email,
                phone,
                password: hashedPassword,
                verificationToken
            }
        })

        // Sending mail using nodemailer

    } catch (error) {
        res.status(500).json({
            success: false,
            error,
            message: "Registration failed",
        })
    }
};

export const loginUser = async (req, res) => {
    // get data
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }

    // check in DB
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid email or password",
            })
        }

        // Comparing the password
        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "invalid email or password",
            })
        }

        // if password gets matched then login the user by creating session by JWT
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        // To send toke
        const cookieOptions = {
            httpOnly: true
        }
        res.cookie('token', token, cookieOptions)

        return res.status(201).json({
            success: true,
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            },
            message: "Login Success",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Login failed",
        })
    }
};
