import { Router } from "express";
import { handleJWT } from "../../middlewares/auth";

const router = Router();

// GET /auth/validate/me
router.get("/me", handleJWT, (req, res, next) => {
    try {
        res.status(200).json({ message: 'Token valido!' });
    } catch (error) {
        next(error);
    }
});

export default router;