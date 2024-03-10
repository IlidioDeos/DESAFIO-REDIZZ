import passport from 'passport';
import type { Request, Response, NextFunction } from 'express';

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {

        if (error){
            return next(error);
        }

        if (info){
            return res.status(401).json({ message: info.message });
        }

        req.currentUser = user;
        next();


    })(req, res, next);
};