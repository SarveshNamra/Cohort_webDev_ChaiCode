import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import User from "../models/user.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import mongoose from "mongoose";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // JWt Token Validation
    const token = req.cookies?.accessToken || 
                req.header("Authorization")?.replace("Bearer ", "")   // This line is for -> as moble application it don't have cookies

    if(!token){
        throw new ApiError(401, "Unauthorised request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // User Validation
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

        if(!user){
            throw new ApiError(401, "Invalid access token");
        }
        req.user = user;   // Attach user data to the request object
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

// Project Permission Validation
export const validateProjectPermission = (roles = []) => 
    asyncHandler(async (req,res) => {
        // Project ID Validation
        const {projetId} = req.params;   // This projetId is comming from note.routes.js
        if(!projetId){
            throw new ApiError(401, "Invalid project id");
        }

        // Project Membership Validation
        const project = await ProjectMember.findOne({
            // project: projetId, // Insted of this line of code use below given code line 
                                    // because, jab ham log req.params say value leke(onst {projetId} = req.params;) aate hai to kbhi-kbhi
                                    // projectId ka dataType change hokar string ho jata hai toh issay error aayega.
                                    // To be no safe side we use this line of code given below -->
            project: mongoose.Types.ObjectId(projetId),
            user: mongoose.Types.ObjectId(req.user._id),  // We get user form -> as user is login we can get it's _id
        })
        if(!projet){
            throw new ApiError(401, "Project not found");
        }

        // Role-Based Access Control
        const givenRole = project?.role;  // Yaha maynay project member ka role leya aur 1k variable may dala
        req.user.role = givenRole;  // Aur fir variable ko pass kardeya user kay role may
        
        if(!roles.includes(givenRole)){     // Ham yha array kay ander(roles = []) jo roles mealy hai aur, jo ham nay givenRole hekala
                                            // hai wo iss array k aandar mil raha ya nahe.
                                            // Array k aandar role milrha nhe-milrha ka matlab hai ke, hame note-routes k aander jo ye
                                            // hai ([UserRolesEnum.ADMIN]) multiple bhi ho sakate hai wo atlist 1k to bhi honahe chhey
            throw new ApiError(403, "You do not have permission to perform this action");
        }
})