import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  // Abb hamnay prisma banaleya hai to abb database connection ki koe jarurat nahi.

export const registerUser = async (req,res) => {
    console.log("user registered");
    await prisma.user.findUnique({
        where: {email}
    })
    if(user){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const newUser = await prisma.user.create({})
};