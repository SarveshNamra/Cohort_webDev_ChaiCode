import {asyncHandler} from "../utils/async-handler.js";
import {User} from "../models/user.models.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";

// ----> Homework to complete all the validations <----

const registerUser = asyncHandler(async (req, res) => {
    // 1. get user data 
    const {username, email, password , fullname, role} = req.body;

    // validation

        //name,email,pass,conform_pass
        // check user already exsists
        //login-> create user db im db
        //hash the pass
        //save token in db
        //check email(token) if true login success
        if(!username || !email || !password){
            // return res.status(400).json({
            //     message: "All fields are required",
            // });
            throw new ApiError(409, "All fields are required");
        }

            // check user already exsists
            const existingUser = await User.findOne({email});
            // 'User' refers to a model or class and 'user' refers to an instance of that model
            // 'user' is a Mongoose document instance - When you do await 'User.findOne({email})', 
            // it returns a Mongoose document (not a plain object).
            // If the variable name matches the key name in the object, you can use this shorthand instead of writing email: email.

            if(existingUser && existingUser.isEmailVerified){
                throw new ApiError(409, "User already exsists");
            }

            // added user in db
            const user = existingUser && !existingUser.isEmailVerified 
            ? existingUser :
            await User.create({
                username, fullname, email, password, role
            });

            if(!user){
                throw new ApiError(409, "User not registered");
            }

            // Instance methods (userSchema.methods.*) → Call on user instances: user.methodName()
            // Static methods (userSchema.statics.*) → Call on the model: User.methodName()
            const {hashedToken, unHashedToken, tokenExpiry} = user.generateTemporaryToken();
            user.emailVerificationToken = hashedToken;
            user.emailVerificationExpiry = new Date(tokenExpiry);
            await user.save();

            // send this token in email to the user
            const transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_SMTP_HOST,
                port: process.env.MAILTRAP_SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAILTRAP_SMTP_USER,
                    pass: process.env.MAILTRAP_SMTP_PASS,
                },
            });

            const mailOption = {
                from: process.env.MAILTRAP_SENDEREMAIL,
                to: user.email,
                subject: "Please verify your email ✔",
                text: `click on following link : 
                        ${process.env.BASE_URL}/api/v1/user/verify/${unHashedToken}`, // plain‑text body
                html: `<p>Click to verify your email <a href="${process.env.BASE_URL}/api/v1/user/verify/${unHashedToken}">Verify Email</p>`,
            }

            await transporter.sendMail(mailOption);     
            res.status(200).json({
                success: true,
                message: "User registered successfully",
            });
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    // validation

        // see user email exsists or not
        // see password matches or not
        // check user is verified or not.
        //
    if(!email || !password){
        throw new ApiError(409, "All fields are required");
    }

    // see user email exsists or not
    const user = await User.findOne({email: email})
    if(!user){
        throw new ApiError(409, "Email not match");
    }

    // see password matches or not
    const isMatch = await bcrypt.compare(password, user.password);
    //user is a Mongoose document instance - When you do await User.findOne({email}), it returns a Mongoose document (not a plain object).
    //Mongoose documents have direct property access - You can access schema fields directly:

    if(!isMatch){
        throw new ApiError(409, "Invalid email or password");
    }

    // check user is verified or not.
    if(!user.isEmailVerified){
        throw new ApiError(409, "User is not verified");
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 24*60*60*1000
    }
    res.cookie("accessToken", token, cookieOptions)

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user:{
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            role: user.role
        }
    })
});

const logoutUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
    // validation
        // clear auth cookie
        // cookie will remove and expiry will be 0
    const cookieOperations = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
    };

    res.cookie('accessToken', '', {
        expires: new Date(0)     // cookies get imediately clear.
    });

    // res.clearCookie('token', cookieOptions);
    // res.clearCookie('refreshToken', cookieOptions);

    return res.status(200).json({
        success: true,
        message: "Logout successfully...",
    });
});

const verifiEmail = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    // validation
        // get token from url
        // validate
        // in db find user based on token
        // remove verification token 
        // save
        // response

    const {unHashedToken} = req.params;
    if(!unHashedToken) {
        throw new ApiError(409, "Token is missing");
    }
    
    // hash token to compare with the DB
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");

    // find user and check expiry
    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry:{ $gt: new Date() }, // Not expired
    });

    if(!user){
        throw new ApiError(409, "Token is invalid or has been expired");
    }

    // Update user: verify and remove token
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    // save
    await user.save();

    // response
    res.status(200).json({
        success: true,
        message: "Email verification done successfull...",
    });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const {email} = req.body;

    // validation
        // email validations
        // find user
        // Generate a new verification token

    if(!email){
        throw new ApiError(400, "Email is required");
    }
    const normalizedEmail = String(email).trim().toLowerCase();

    const sendGenericSuccess = () =>
        res.status(200).json({
            success: true,
            message: "If this email is registered and not verified",
        });

    // find user
    const user = await User.findOne({email: normalizedEmail});
    if(!user){
        return sendGenericSuccess();
    }

    // Already verified
    if(user.isEmailVerified){
        return sendGenericSuccess();
    }

    const {hashedToken, unHashedToken, tokenExpiry} = user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = new Date(tokenExpiry);

    await user.save({validateBeforeSave: false});

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: user.email,
        subject: "Please verify your email ✔",
        text: `click on following link : ${process.env.BASE_URL}/api/v1/user/verify/${unHashedToken}`, // plain‑text body
        html: `<p>Click to verify your email <a href="${process.env.BASE_URL}/api/v1/user/verify/${unHashedToken}"></p>`,
    };
    
    await transporter.sendMail(mailOption); 

    return sendGenericSuccess();
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const {email ,username, password, role} = req.body;
    // validation
        // resive refresh token from cookies or body
        // verify token with jwt
        // find user and verify token matches the token stored in db
        // set new refresh token and access token and then reset expiry time
        // save
        // update cookies

    const tokenFromCooky = req.cookies?.refreshToken; // || req.body?.refreshToken;
    if(!tokenFromCooky){
        throw new ApiError(401, "Refresh token is missing");
    }

    let decoded;
    try {
        decoded = jwt.verify(tokenFromCooky, process.env.REFRESH_TOKEN_SECRET);       //verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const userIdFromToken = decoded._id;
    if (!userIdFromToken) {
        throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(userIdFromToken);
    if(!user || !user.refreshToken){
        throw new ApiError(401, "Unauthorised");
    }

    if(user.refreshToken !== tokenFromCooky){
        throw new ApiError(401, "Refresh token not match...");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({validateBeforeSave: false});

    const accessCookieOptions = {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    };

    const refreshCookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // update cookie
    res.cookie("accessToken", newAccessToken, accessCookieOptions);
    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions)

    return res.status(200).json({
        success: true,
        message: "Access token refreshed",
        accessToken: newAccessToken,
    });
});

const frogotPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // validation
        // check user exsists
        // generate temp reset token and expiry time
        // store token and expiry in db
        // send email with link and unhashed token

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(409, "Email is required");
    }

    const {hashedToken, unHashedToken, tokenExpiry} = user.generateTemporaryToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = new Date(tokenExpiry);
    await user.save({validateBeforeSave:false}); // to skip other validations

    const resetUrl = `${process.env.BASE_URL}/reset-password/${unHashedToken}`;

    // send this token in email to the user
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: user.email,
        subject: "Please verify your email ✔",
        text: `click on following link : ${resetUrl}`, // plain‑text body
        html: `<p>Click to verify your email <a href="${resetUrl}"></p>`,
    }

    await transporter.sendMail(mailOption);

    res.status(200).json({
        success: true,
        message: "Reset link sent to your email address",
    });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {email, password, newPassword, conformPassword} = req.body;

    // validation
        // email, password from req.body
        // checking user exsists
        // find user in db
        // check pass and current pass are same or not
        // new password and conform pass
        // store in db

        const userEmail = req.user?.email;
        if(!userEmail){
            throw new ApiError(409, "Unauthorized");
        }

        const user = await User.findOne({email});
        if(!user){
            throw new ApiError(409, "Email doesn't match...")
        }

        const ok = await user.isPasswordCorrect(password)
        if(!ok){
            throw new ApiError(409, "Password doesn't match");
        }

        user.password = newPassword;
        user.refreshToken = undefined;

        await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Password changed successfully..",
        })
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;

    // validation
        // get user from req.user
        // return email, pass, role, etc.
        
    const user = req.user;

    if(!user){
        throw new ApiError(401, "User not autenticated");
    }

    res.status(200).json({
        success: true,
        message: "Current user retrived successfully",
        user:{
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    });
});

export {registerUser, loginUser, logoutUser, verifiEmail, resendVerificationEmail, refreshAccessToken, frogotPasswordRequest, changeCurrentPassword, getCurrentUser}