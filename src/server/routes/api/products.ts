import { Router } from "express";
import db from "../../db";
import { handleJWT } from "../../middlewares/auth";

const router = Router();

// Aplica o middleware de autenticação nas rotas de POST, PUT, DELETE
router.use(['/','/:id'], (req, res, next) => {
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        handleJWT(req, res, next);
    } else {
        next();
    }
});

// GET /api/produtos/:id - Obter um produto específico pelo ID
router.get("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const produto = await db.products.getById(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).send('Produto não encontrado');
        }
    } catch (error) {
        next(error);
    }
});

// GET /api/produtos/ - Listar todos os produtos
router.get("/", async (req, res, next) => {
    try {
        const produtos = await db.products.getAll();
        res.json(produtos);
    } catch (error) {
        next(error);
    }
});

// POST /api/produtos/ - Criar um novo produto
router.post("/", async (req, res, next) => {
    try {
        const newProduct = req.body;
        const result = await db.products.insert(newProduct);
        res.status(201).json({ id: result.insertId, ...newProduct });
    } catch (error) {
        next(error);
    }
});

// PUT /api/produtos/:id - Atualizar um produto existente
router.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const productUpdates = req.body;
        await db.products.update(id, productUpdates);
        res.json({ message: "Produto atualizado com sucesso.", id, ...productUpdates });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/produtos/:id - Remover um produto
router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await db.products.remove(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Rota privada de exemplo
router.get("/private", handleJWT, async (req, res, next) => {
    try {
       res.json("Acesso permitido");
    } catch (error) {
        next(error);
    }
});

export default router;
