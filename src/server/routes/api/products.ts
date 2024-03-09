import { Router } from "express";

const router = Router();

// GET /api/products/
router.get("/", (req, res, next) => {
    try{
        res.json("Produtos");
    } catch (error) {
        next(error);
    }
});

export default router;