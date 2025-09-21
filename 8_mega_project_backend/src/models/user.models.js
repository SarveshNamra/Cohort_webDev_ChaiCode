import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
    avatar:{
        type: {
            url: String,
            localpath: String,
        },
        default: {
            url: `https://placehold.co/600x400`,
            localpath: "",
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //index: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
    isEmailVerified: {   // This is for email verification( This is added by me )
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationExpiry: {
        type: Date,
    },
},{
    timestamps: true,
});

// Hooks
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// methods
userSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign( // payload
        {
            __id: this.__id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign( // payload
        {
            __id: this.__id,
            email: this.email,
            username: this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
};

// methods for isEmailVerified 
// Fun excersise -> Hm DB may Hashed Token rakh rahai hai aur, user ko bhajunga normal token
userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
    const tokenExpiry = Date.now() + (20*60*1000) // 20 min
    return {hashedToken, unHashedToken, tokenExpiry}
}

export const User = mongoose.model("User", userSchema);