import express from "express";

const authRouts = express.Router();

authRouts.post("/register");

authRouts.post("/login");

authRouts.post("/logout");

authRouts.get("/check");

export default authRouts;