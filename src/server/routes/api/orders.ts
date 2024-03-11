import { Router } from "express";
import db from "../../db";
import { handleJWT } from "../../middlewares/auth";

const router = Router();

// GET /api/orders - Obter todos os pedidos
router.get("/", async (req, res, next) => {
    try {
        const pedidos = await db.orders.getAll();
        res.json(pedidos);
    } catch (error) {
        next(error);
    }
});

// GET /api/orders/:id - Obter um pedido específico pelo ID
router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const pedido = await db.orders.getById(id);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).send('Pedido não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/orders/customer/:customerId - Obter pedidos por cliente
router.get("/customer/:customerId", async (req, res, next) => {
    try {
        const customerId = Number(req.params.customerId);
        const pedidos = await db.orders.getByCustomerId(customerId);
        res.json(pedidos);
    } catch (error) {
        next(error);
    }
});

// POST /api/orders - Criar um novo pedido
router.post("/", handleJWT, async (req, res, next) => {
    try {
        const novoPedido = req.body;
        // Inserção do pedido no banco de dados
        const resultadoInsert = await db.orders.insert(novoPedido);
        // Aqui, resultadoInsert.insertId contém o id do novo pedido inserido
        if (resultadoInsert.insertId) {
            const novoPedidoCriado = await db.orders.getById(resultadoInsert.insertId);
            res.status(201).json(novoPedidoCriado);
        } else {
            throw new Error('Falha ao criar o pedido.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno ao criar o pedido.');
    }
});



// PUT /api/orders/:id - Atualizar um pedido existente
router.put("/:id", handleJWT, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const atualizacoesPedido = req.body; // Ajuste aqui conforme a estrutura da interface Order para atualizações
        await db.orders.update(id, atualizacoesPedido);
        res.json({ message: "Pedido atualizado com sucesso", id, ...atualizacoesPedido });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/orders/:id - Excluir um pedido
router.delete("/:id", handleJWT, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await db.orders.remove(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
