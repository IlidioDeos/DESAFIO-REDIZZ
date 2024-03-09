import { Router } from "express";

const router = Router();

// POST /auth/login/
router.post("/", (req, res, next) => {
    res.json({ message: "Login Baby" });
});

export default router;