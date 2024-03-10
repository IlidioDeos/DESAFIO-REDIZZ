import type { Request, Response, NextFunction } from "express";

// Usando next para tratar 404.
export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found - ${req.method} ${req.originalUrl}`);
    error['status'] = 404;
    next(error);
};

// Usando next para tratar erros.
export const globalError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(error['status'] || 500);
    res.json({ error: error.message });
};