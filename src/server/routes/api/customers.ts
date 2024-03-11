import { Router } from "express";
import db from "../../db";
import { handleJWT } from "../../middlewares/auth";


const router = Router();

// GET /api/customers/:id - Obter um cliente específico pelo ID
router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const cliente = await db.customers.getById(id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/customers/ - Listar todos os clientes
router.get("/", async (req, res, next) => {
    try {
        const clientes = await db.customers.getAll();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
});

// POST /api/customers/ - Criar um novo cliente
router.post("/", async (req, res, next) => {
    try {
        const newCustomer = req.body;
        const result = await db.customers.insert(newCustomer);
        res.status(201).json({ id: result.insertId, ...newCustomer });
    } catch (error) {
        next(error);
    }
});

// PUT /api/customers/:id - Atualizar um cliente existente
router.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const customerUpdates = req.body;

        // Verifique se o email já existe e não pertence ao cliente que está sendo atualizado
        const existingCustomers = await db.customers.findByEmailAndExcludeId(customerUpdates.email, id);
        if (existingCustomers.length > 0) {
            return res.status(400).json({ message: "E-mail já está cadastrado por outro cliente." });
        }

        // Se o e-mail é único ou pertence ao mesmo cliente, prossiga com a atualização
        await db.customers.update(id, customerUpdates);
        res.json({ message: "Cliente atualizado com sucesso.", id, ...customerUpdates });
    } catch (error) {
        next(error);
    }
});


// DELETE /api/customers/:id - Remover um cliente
router.delete("/:id", handleJWT, async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await db.customers.remove(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
