import express from 'express';
import { registerUser } from '../controllers/auth.controllers.js';

const userRoutes = express.Router();

userRoutes.post('/register',registerUser);

export default userRoutes;