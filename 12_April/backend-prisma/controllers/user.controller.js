import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Register request:', { name, email, password: '***' });

    if (!name || !email || !password) {
        console.log('Missing required fields:', { 
            name: !!name, 
            email: !!email, 
            password: !!password 
        });
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken
            }
        });

        // Send verification email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDER_EMAIL,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on the following link to verify your email: ${process.env.BASE_URL}/api/v1/users/verify/${verificationToken}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "User registered, check your email to verify"
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set cookie
        const cookieOptions = {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        };

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching profile"
        });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            path: '/',
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during logout'
        });
    }
};

export const verifyUser = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({
            message: "Invalid token"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token"
            });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                passwordResetToken: null,
                passwordResetExpires: null
            }
        });

        res.status(200).json({
            message: "User verified"
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(400).json({
            message: "User not verified",
            error: error.message
        });
    }
};
