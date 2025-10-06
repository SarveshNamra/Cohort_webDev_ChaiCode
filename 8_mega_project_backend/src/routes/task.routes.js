import { Router } from "express";

const router = Router()

router.get("/", (req, res) => res.json({
    ok: true, where: "tasks list" 
}));

export default router