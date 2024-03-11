import { Router } from "express";
import customersRouter from "./customers";
import productsRouter from "./products";
import ordersRouter from "./orders";
import orderProductsRouter from "./ordersProducts";

const router = Router();

router.use("/customers", customersRouter);
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/orderProducts", orderProductsRouter);

export default router;