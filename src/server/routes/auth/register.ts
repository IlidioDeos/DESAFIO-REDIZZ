import { Router } from "express";
import { createJWT } from "../../utils/tokens";
import db from "../../db";
import bcrypt from 'bcrypt';

const router = Router();

// POST /auth/register/
router.post("/", async (req, res, next) => {
    try {


        const { email, password } = req.body;

        if (!email || !isValidEmail(email)){
            return res.status(401).json({ message: 'Email invalido!' });
        }

        const [emailExists] = await db.users.find('email', email);
        if (emailExists) {
            return res.status(401).json({ message: 'Email já cadastrado!' });
        }

        const newUser = {
            id: Number,
            ...req.body
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        newUser.password = hash;
        
        await db.users.insert(newUser);
        delete newUser.password;

        const token = createJWT(newUser.id);
        res.json({ token });
    } catch (error) {
        next(error);
    }
});

// Verificar se é um email valido.
function isValidEmail(email: string) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}

export default router;