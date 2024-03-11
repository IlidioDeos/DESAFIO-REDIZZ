import { Router } from "express";
import db from "../../db";

const router = Router();

// GET /api/statusOrders/ - Listar todos os status de pedido
router.get("/", async (req, res, next) => {
    try {
        const status = await db.statusOrders.getAll();
        res.json(status);
    } catch (error) {
        next(error);
    }
});

// GET /api/status-orders/:id - Obter um status de pedido específico pelo ID
router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const status = await db.statusOrders.getById(id);
        if (status) {
            res.json(status);
        } else {
            res.status(404).send('Status do pedido não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

// Inserir um novo status de pedido
router.post("/", async (req, res, next) => {
    try {
        const { descricao } = req.body;
        const result = await db.statusOrders.insert(descricao);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// Atualizar um status de pedido
router.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { descricao } = req.body;
        const result = await db.statusOrders.update(id, descricao);
        if (result.affectedRows > 0) {
            res.json({ message: "Status do pedido atualizado com sucesso." });
        } else {
            res.status(404).send('Status do pedido não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

// Remover um status de pedido
router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const result = await db.statusOrders.remove(id);
        if (result.affectedRows > 0) {
            res.json({ message: "Status do pedido removido com sucesso." });
        } else {
            res.status(404).send('Status do pedido não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

export default router;
