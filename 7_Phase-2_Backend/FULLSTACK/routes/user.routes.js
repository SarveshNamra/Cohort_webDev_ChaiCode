import express from "express";
import { registerUser, verifyUser, login, getMe, logoutUser, forgetPassword, resetPassword} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

// after creating verifyUser
router.get("/verify/:unHashedToken", verifyUser);

// For login
router.post("/login", login);

// Middleware is allways uased in routes because middleware is a functionality excitude in middle.
router.get("/me", isLoggedIn, getMe);
router.get("/logout", isLoggedIn, logoutUser);
router.post("/reset-password",forgetPassword);

export default router;