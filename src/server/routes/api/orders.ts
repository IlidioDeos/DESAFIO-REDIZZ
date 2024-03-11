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

// POST, PUT, DELETE - Similar aos exemplos fornecidos, aplicando o middleware de autenticação
router.post("/", handleJWT, async (req, res, next) => {
    try {
        const novoPedido = req.body; // Assumindo que o corpo da requisição contém os dados do pedido
        const resultado = await db.orders.insert(novoPedido); // Substitua 'insert' pela sua função de inserção de pedidos
        res.status(201).json(resultado); // Envia de volta o pedido criado com status 201 (Criado)
    } catch (error) {
        next(error);
    }
});


router.put("/:id", handleJWT, async (req, res, next) => {
    try {
        const id = Number(req.params.id); // Obtenha o ID do pedido a partir da URL
        const atualizacoesPedido = req.body; // Dados para atualização
        await db.orders.update(id, atualizacoesPedido); // Substitua 'update' pela sua função de atualização de pedidos
        res.json({ message: "Pedido atualizado com sucesso", id, ...atualizacoesPedido });
    } catch (error) {
        next(error);
    }
});


router.delete("/:id", handleJWT, async (req, res, next) => {
    try {
        const id = Number(req.params.id); // Obtenha o ID do pedido a partir da URL
        await db.orders.remove(id); // Substitua 'remove' pela sua função de remoção de pedidos
        res.status(204).send(); // Nenhuma resposta de conteúdo, mas indica sucesso
    } catch (error) {
        next(error);
    }
});


export default router;
