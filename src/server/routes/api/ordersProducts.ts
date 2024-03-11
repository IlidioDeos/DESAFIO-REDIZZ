import { Router } from "express";
import db from "../../db";
import { handleJWT } from "../../middlewares/auth";

const router = Router();


// GET /api/ordersProducts/ - Listar todos os produtos de todos os pedidos
router.get("/", async (req, res, next) => {
    try {
        const produtos = await db.orderProducts.getAll();
        res.json(produtos);
    } catch (error) {
        next(error);
    }
});

// GET /api/ordersProducts/:orderId - Listar produtos de um pedido
router.get("/:orderId", async (req, res, next) => {
    try {
        const orderId = Number(req.params.orderId);
        const produtos = await db.orderProducts.getByOrderId(orderId);
        res.json(produtos);
    } catch (error) {
        next(error);
    }
});

// POST /api/ordersProducts/ - Associar produto(s) a um pedido
router.post("/", handleJWT, async (req, res, next) => {
    try {
        const { orderId, productId, quantity, unitPrice } = req.body;
        const result = await db.orderProducts.insert({
            pedido_id: orderId,
            produto_id: productId,
            quantidade: quantity,
            preco_unitario: unitPrice
        });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// PUT /api/ordersProducts/ - Atualizar produto de um pedido
router.put("/", handleJWT, async (req, res, next) => {
    try {
        const { orderId, productId, quantity, unitPrice } = req.body;
        const result = await db.orderProducts.update({
            pedido_id: orderId,
            produto_id: productId,
            quantidade: quantity,
            preco_unitario: unitPrice
        });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/ordersProducts/:orderId/:productId - Remover um produto de um pedido
router.delete("/:orderId/:productId", handleJWT, async (req, res, next) => {
    try {
        const orderId = Number(req.params.orderId);
        const productId = Number(req.params.productId);
        const result = await db.orderProducts.remove(orderId, productId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
