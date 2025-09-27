import User  from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { isValidElement, use } from "react";
// import { isAbsolute } from "path/win32";
// import { error } from "console";

// register a user
const registerUser = async (req, res) => {
    // get data
    // validate
    // check if user already exsists
    // create a user in database
    // create a verification token
    // save token in database
    // send token in email to user
    // send success status to user

    // 1) get data

    // req.body.name
    // req.body.email
    // Or
    const {name, email,password} = req.body

    // validate
    if(!name || !email || !password){    // ----- Ye body maysay data kaisay lena hai -----
        return res.status(400).json({  // status is used for showing error like- 300, 400, 404, etc.
            message: "All fields are required",    // abhi api ko banarhayho to json() format may data send karange
        });
    }
    
    // check if user already exsists
    try{
        const exsistingUser = await User.findOne({email})
        if(exsistingUser){
            return res.status(400).json({
                message: "User already exsists",
            });
        }
 
        // Create a User in database
        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user);

        if(!user){
            return res.status(400).json({
                message: "User not registered",
            });
        }

        // Create a verification token
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);
        user.verificationToken = token
        await user.save()

        // Send token in email to user.
            // send mail by using " nodemailer "
            const transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_HOST,
                port: process.env.MAILTRAP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD,
                },

                // host: 'smtp.ethereal.email',
                // port: 587,
                // auth: {
                //     user: 'tod.feil@ethereal.email',
                //     pass: 'm7w2qgaNSH5JXdKSzp'
                // }
            });

            const mailOption = {
                from: process.env.MAILTRAP_SENDEREMAIL,
                to: user.email,     // Here 'user' is used not the 'User'.
                subject: "Verify your email",  // Subject Line
                text: `please click on following link : 
                        ${process.env.BASE_URL}/api/v1/user/verify${token} `, // user ko bhajena hai 1k link, to wo click kare
                //html: "<b>Hello world?</b>", // HTML body
            }

            await transporter.sendMail(mailOption)  // email send

            // send mail to user
            res.status(201).json({
                message: "User registered successfully",
                success: true,
            })
    }
    catch (error){
        res.status(400).json({
            message: "User not registered ",
            error,
            success: false,
        });
    }
    console.log(email);
};

// Now verify user
const verifyUser = async (req, res) => {
    // get token from url
    // validate
    // find user based on token
    // if not - case
    // remove verification token
    // save
    // return responce

    // 1. get token from url
    try{
        const {token} = req.params;    //req.params issay jo bhi parameter may ya url may aa rahahai wo sab mil jata hai.
        console.log(token); 
        if(!token){
            return res.status(400).json({
                message: "Invalid Token",
            });
        }

        // 2. Validate
        
        // 3. find user based on token
        const user = await User.findOne({verificationToken: token})
        
        if(!user){
            return res.status(400).json({
                message: "Invalid Token",
            });
        }

        //4. remove verification token
        user.isVerified = true
        user.verificationToken = undefined

        // 5. save
        await user.save()

        // 6. return responce
        res.status(200).json({
            success: true,
            message: "User verified successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error verifying user",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Database ke bari aai to try-catch, jeetna ho sake utana safety net lagalo
    try{
        // 1. See user email exsists or not
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // 2. See password matches or not
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if(!isMatch){
            res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // 3. To check user is vrified or not.
        if(!user.isVerified){
            res.status(400).json({
                message:"User is not Verified !",
            });
        }

        // 4. User say pata kaisay kare ke wo login rehai


        console.log("isVerified",user.isVerified);

        // To use JWT -  1st npm install jsonwebtoken. 2nd then import jwt.

        // jwt has 3 parameters 1st data kya dallu. 2nd Secrest kya dalu. 3rd Object may expire kab ho rahahai ye.
         const token = jwt.sign({id: user._id},   // This {id: user._id} are regular object 
            process.env.JWY_SECRET, {            // This is secreate and it goes in process.env
                expiresIn: '24h'
            }
        );

        // ------ Now to store token in cookies ------
        // We can't access cookies directly in express 
        // We need to install packaje to be install cookie-parser
        // import it in index.js
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000  // this way cookie comes for 24 hour only then, it gets expire
        }
        res.cookie("token", token, cookieOptions)     // cookies comes in key-value format like - ("test", token)
        // Above code sets cookie only and it sends jwt token to user.

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                role: user.role
            }
        })

    }

    catch(error){
        res.status(400).json({
            message: "Error in login",
            error,
            isVerified: false, 
        })
    }
}

// user profile dhakeni ho to
// logout
// forgot password
// reset password

const getMe = async (req, res) => {
    try{
        const data = req.user;
        console.log("Reached at profile level", data);

        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
    catch(error){
        console.log("Error in get me", error);
    }
}

const logoutUser = async (req, res) => {
    try{
        res.cookie('token', '', {
            // expires: new Date(0)        // Yessay cookie immediately clear ho jate hai
        });
        res.status(200).json({
            success: true,
            message: "Logedout successifuly"
        })
    }
    catch(error){

    }
}

const forgetPassword = async (req, res) => {
    try{
        // get mail
        // find user based on email
        // reset token + reset expiry => Date.now() + 10 * 60 * 1000 => user.save()
        // send mail => design url
        
    }
    catch(error){

    }
}

const resetPassword = async (req, res) => {
    try{
        // collect token from params
        // password from req.body
        // find user
        // set password in user
        // resetToke, resetExpire => reset
        // save 

        // 1) collect token from params
        const {token} = req.params;
        
        // 2) password from req.body
        const {password} = req.body;

        // 3) find user
        try {
            const user = await User.findOne({
                resetPassword: token,
                resetPasswordExpires: {$gt: Date.now()}   // This functionality is give by mongoDB {$gt - - -}
            })
        } catch (error) {
            
        }
    }
    catch(error){

    }
}

export { registerUser , verifyUser, login, getMe, logoutUser, forgetPassword, resetPassword };