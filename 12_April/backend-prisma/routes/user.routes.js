import express from 'express';
import { registerUser, loginUser, getMe, verifyUser, logoutUser } from '../controllers/user.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';

export const userRouter = express.Router();

userRouter.post('/register', registerUser); // Keep /register for backward compatibility
userRouter.post('/signup', registerUser);   // Add /signup endpoint
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/me', isLoggedIn, getMe);
userRouter.get('/verify/:token', verifyUser);
