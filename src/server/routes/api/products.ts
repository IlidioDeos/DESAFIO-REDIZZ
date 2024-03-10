import { Router } from "express";
import db from "../../db";

const router = Router();

// GET /api/produtos/
router.get("/", async (req, res, next) => {
    try{
        const results = await db.products.all();
        res.json(results);
    } catch (error) {
        next(error);
    }
});

export default router;